import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private skillSprites: { sprite: THREE.Sprite, skill: any }[] = [];
  private hoveredSkill: any = null;
  private frameId: number | null = null;

  skillCategories: any[] = [];
  selectedCategory: string = 'all';
  selectedSkill: any = null;

  constructor(private skillsService: SkillsService) {}

  ngAfterViewInit(): void {
    this.skillCategories = this.skillsService.getSkillCategories();
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.skillSprites.map(s => s.sprite));

    if (intersects.length > 0) {
      const intersected = intersects[0].object as THREE.Sprite;
      const skillData = this.skillSprites.find(s => s.sprite === intersected)?.skill;

      if (this.hoveredSkill !== skillData) {
        // Reset previous hover
        if (this.hoveredSkill) {
          const prevSprite = this.skillSprites.find(s => s.skill === this.hoveredSkill)?.sprite;
          if (prevSprite) {
            (prevSprite.material as THREE.SpriteMaterial).color.set(0xffffff);
            prevSprite.scale.set(5, 5, 1);
          }
        }

        // Highlight new hover
        (intersected.material as THREE.SpriteMaterial).color.set(0x00ff00);
        intersected.scale.set(6, 6, 1);
        this.hoveredSkill = skillData;
      }
    } else if (this.hoveredSkill) {
      const prevSprite = this.skillSprites.find(s => s.skill === this.hoveredSkill)?.sprite;
      if (prevSprite) {
        (prevSprite.material as THREE.SpriteMaterial).color.set(0xffffff);
        prevSprite.scale.set(5, 5, 1);
      }
      this.hoveredSkill = null;
    }
  }

  onCanvasClick(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.skillSprites.map(s => s.sprite));

    if (intersects.length > 0) {
      const intersected = intersects[0].object as THREE.Sprite;
      const skillData = this.skillSprites.find(s => s.sprite === intersected)?.skill;
      this.selectedSkill = skillData;
    } else {
      this.selectedSkill = null;
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.updateSkillVisibility();
  }

  private updateSkillVisibility(): void {
    this.skillSprites.forEach(({ sprite, skill }) => {
      const visible = this.selectedCategory === 'all' || skill.category === this.selectedCategory;
      sprite.visible = visible;
    });
  }

  private initThree(): void {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 50;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.domElement.addEventListener('click', (event) => this.onCanvasClick(event));
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;

    // Create skill sphere
    this.createSkillSphere();
  }

  private createSkillSphere(): void {
    const skills = this.skillsService.getSkills();
    const radius = 20;

    skills.forEach((skill, index) => {
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Create canvas for text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      const size = 300;
      canvas.width = size;
      canvas.height = size;

      // Draw skill text
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, size, size);

      context.font = 'bold 35px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#ffffff';
      context.fillText(skill.name, size / 2, size / 2);

      // Create texture and material
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true
      });

      // Create sprite
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(5, 5, 1);
      sprite.userData = { skill };

      this.scene.add(sprite);
      this.skillSprites.push({ sprite, skill });
    });
  }

  private animate(): void {
    this.frameId = requestAnimationFrame(() => this.animate());

    // Rotate the skills sphere slowly
    this.skillSprites.forEach(({ sprite }) => {
      sprite.lookAt(this.camera.position);
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}