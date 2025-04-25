import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

@Component({
  selector: 'app-three-background',
  standalone: true,
  templateUrl: './three-background.component.html',
})
export class ThreeBackgroundComponent implements AfterViewInit {
  @ViewChild('canvas3d') canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particleSystem!: THREE.Points;
  private composer!: EffectComposer;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    this.addMouseParallax();
  }

  initScene() {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene and Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
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

    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: new THREE.Color(0xffffff), // White color for glow effect
      transparent: true,
      opacity: 1.0,
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);

    // Lights (Optional for 3D meshes)
    const pointLight = new THREE.PointLight(0xffffff, 2); // High intensity for glow
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    // Postprocessing (EffectComposer for Bloom)
    const renderPass = new RenderPass(this.scene, this.camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,   // strength of bloom
      0.4,   // radius
      0.85   // threshold
    );

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);

    // Resize event listener
    window.addEventListener('resize', () => this.onResize());
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.particleSystem.rotation.y += 0.0005;
    this.particleSystem.rotation.x += 0.0002;

    // Render with composer (Bloom effect)
    this.composer.render();
  };

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  addMouseParallax() {
    window.addEventListener('mousemove', (event) => {
      const x = (event.clientX / window.innerWidth) - 0.5;
      const y = (event.clientY / window.innerHeight) - 0.5;

      this.camera.position.x = x * 2;
      this.camera.position.y = -y * 2;
      this.camera.lookAt(0, 0, 0);
    });
  }
}
