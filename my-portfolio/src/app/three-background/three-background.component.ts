import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import type * as THREE from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BackgroundService } from '../services/background.service';
import { prefersReducedMotion } from '../three/motion';
import { sampleTextPoints } from '../three/text-points';

const THREE_FOV = 75;

@Component({
  selector: 'app-three-background',
  standalone: true,
  templateUrl: './three-background.component.html',
})
export class ThreeBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas3d') canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particleSystem!: THREE.Points;
  private composer!: EffectComposer;
  private material!: THREE.PointsMaterial;
  private bloomPass!: UnrealBloomPass;
  private frameId: number | null = null;
  private driftPositions!: Float32Array;
  private initialsPositions!: Float32Array;
  private reducedMotion = false;
  private destroyed = false;

  /** Resolves once Three.js has loaded and the scene is running. */
  ready: Promise<void> = Promise.resolve();
  private readonly onResizeHandler = () => this.onResize();
  private readonly onMouseMoveHandler = (event: MouseEvent) => this.onMouseMove(event);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private background: BackgroundService
  ) {}

  ngAfterViewInit(): void {
    // WebGL only exists in the browser, not during server-side rendering
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // Three.js is large, so it is fetched after the page is already visible
    this.ready = this.start();
  }

  private async start(): Promise<void> {
    const [three, composer, renderPass, bloomPass] = await Promise.all([
      import('three'),
      import('three/examples/jsm/postprocessing/EffectComposer.js'),
      import('three/examples/jsm/postprocessing/RenderPass.js'),
      import('three/examples/jsm/postprocessing/UnrealBloomPass.js')
    ]);
    if (this.destroyed) {
      return;
    }
    this.initScene(three, composer.EffectComposer, renderPass.RenderPass, bloomPass.UnrealBloomPass);
    this.animate();
    this.addMouseParallax();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    window.removeEventListener('resize', this.onResizeHandler);
    window.removeEventListener('mousemove', this.onMouseMoveHandler);
    this.composer?.dispose();
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
  }

  initScene(
    THREE: typeof import('three'),
    Composer: typeof import('three/examples/jsm/postprocessing/EffectComposer.js').EffectComposer,
    RenderPass: typeof import('three/examples/jsm/postprocessing/RenderPass.js').RenderPass,
    UnrealBloomPass: typeof import('three/examples/jsm/postprocessing/UnrealBloomPass.js').UnrealBloomPass
  ) {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene and Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(THREE_FOV, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Particles
    const particles = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.driftPositions = positions.slice();
    this.reducedMotion = prefersReducedMotion();

    this.material = new THREE.PointsMaterial({
      size: 0.1,
      color: new THREE.Color(0xffffff), // White color for glow effect
      transparent: true,
      opacity: 1.0,
    });

    this.particleSystem = new THREE.Points(geometry, this.material);
    this.scene.add(this.particleSystem);

    // Lights (Optional for 3D meshes)
    const pointLight = new THREE.PointLight(0xffffff, 2); // High intensity for glow
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    // Postprocessing (EffectComposer for Bloom)
    const renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,   // strength of bloom
      0.4,   // radius
      0.85   // threshold
    );

    this.composer = new Composer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(this.bloomPass);

    this.buildInitials();

    // Resize event listener
    window.addEventListener('resize', this.onResizeHandler);
  }

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);

    const toInitials = this.background.formation() === 'initials';
    this.morphParticles(toInitials ? this.initialsPositions : this.driftPositions);
    this.morphLook(toInitials);
    this.spinParticles(toInitials);

    // Render with composer (Bloom effect)
    this.composer.render();
  };

  /** Moves every particle a step towards its place in the current formation. */
  private morphParticles(target: Float32Array) {
    const ease = this.reducedMotion ? 1 : 0.06;
    const attribute = this.particleSystem.geometry.getAttribute('position') as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    for (let i = 0; i < positions.length; i++) {
      positions[i] += (target[i] - positions[i]) * ease;
    }
    attribute.needsUpdate = true;
  }

  /** Fades towards small, crisp dots with less glow for the letters, and back for the drifting cloud. */
  private morphLook(toInitials: boolean) {
    const ease = this.reducedMotion ? 1 : 0.06;
    this.material.size += ((toInitials ? 0.045 : 0.1) - this.material.size) * ease;
    this.bloomPass.strength += ((toInitials ? 0.6 : 1.5) - this.bloomPass.strength) * ease;
  }

  /** Samples the initials again so they fit the current window, also on a narrow phone screen. */
  private buildInitials() {
    const fov = THREE_FOV * Math.PI / 180;
    const visibleWidth = 2 * this.camera.position.z * Math.tan(fov / 2) * this.camera.aspect;
    this.initialsPositions = sampleTextPoints('PG', this.driftPositions.length / 3, Math.min(9, visibleWidth * 0.85));
  }

  /** Slowly rotates the cloud, or turns it to face the camera while it forms the initials. */
  private spinParticles(facingCamera: boolean) {
    const rotation = this.particleSystem.rotation;
    if (facingCamera) {
      const ease = this.reducedMotion ? 1 : 0.06;
      rotation.x -= rotation.x * ease;
      rotation.y -= rotation.y * ease;
    } else if (!this.reducedMotion) {
      rotation.y += 0.0005;
      rotation.x += 0.0002;
    }
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.buildInitials();
  }

  addMouseParallax() {
    if (this.reducedMotion) {
      return;
    }
    window.addEventListener('mousemove', this.onMouseMoveHandler);
  }

  onMouseMove(event: MouseEvent) {
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;

    this.camera.position.x = x * 2;
    this.camera.position.y = -y * 2;
    this.camera.lookAt(0, 0, 0);
  }
}
