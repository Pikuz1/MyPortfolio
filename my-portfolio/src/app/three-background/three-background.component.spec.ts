import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreeBackgroundComponent } from './three-background.component';

describe('ThreeBackgroundComponent', () => {
  const create = async (platform: 'browser' | 'server') => {
    await TestBed.configureTestingModule({
      imports: [ThreeBackgroundComponent],
      providers: [{ provide: PLATFORM_ID, useValue: platform }]
    }).compileComponents();
    return TestBed.createComponent(ThreeBackgroundComponent);
  };

  describe('in the browser', () => {
    let fixture: ComponentFixture<ThreeBackgroundComponent>;
    let component: any;

    beforeEach(async () => {
      fixture = await create('browser');
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => fixture.destroy());

    it('builds the scene with 1000 particles', () => {
      expect(component.scene).toBeDefined();
      expect(component.particleSystem.geometry.getAttribute('position').count).toBe(1000);
    });

    it('rotates the particles on every frame', () => {
      const before = component.particleSystem.rotation.y;
      spyOn(component.composer, 'render');
      spyOn(window, 'requestAnimationFrame').and.returnValue(7);
      component.animate();
      expect(component.particleSystem.rotation.y).toBeGreaterThan(before);
      expect(component.composer.render).toHaveBeenCalled();
      expect(component.frameId).toBe(7);
    });

    it('resizes the camera and the renderer', () => {
      spyOn(component.renderer, 'setSize');
      spyOn(component.composer, 'setSize');
      spyOnProperty(window, 'innerWidth').and.returnValue(800);
      spyOnProperty(window, 'innerHeight').and.returnValue(400);
      window.dispatchEvent(new Event('resize'));
      expect(component.camera.aspect).toBe(2);
      expect(component.renderer.setSize).toHaveBeenCalledWith(800, 400);
      expect(component.composer.setSize).toHaveBeenCalledWith(800, 400);
    });

    it('moves the camera with the mouse', () => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: window.innerWidth, clientY: 0 }));
      expect(component.camera.position.x).toBeCloseTo(1);
      expect(component.camera.position.y).toBeCloseTo(1);
    });

    it('stops everything when destroyed', () => {
      const cancel = spyOn(window, 'cancelAnimationFrame');
      const removeListener = spyOn(window, 'removeEventListener').and.callThrough();
      const disposeRenderer = spyOn(component.renderer, 'dispose');
      const disposeComposer = spyOn(component.composer, 'dispose');
      component.frameId = 3;
      fixture.destroy();
      expect(cancel).toHaveBeenCalledWith(3);
      expect(removeListener).toHaveBeenCalledWith('resize', jasmine.any(Function));
      expect(removeListener).toHaveBeenCalledWith('mousemove', jasmine.any(Function));
      expect(disposeRenderer).toHaveBeenCalled();
      expect(disposeComposer).toHaveBeenCalled();
    });
  });

  it('can be destroyed before it was initialised', async () => {
    const fixture = await create('browser');
    expect(() => fixture.destroy()).not.toThrow();
  });

  it('does not touch WebGL on the server', async () => {
    const fixture = await create('server');
    fixture.detectChanges();
    expect((fixture.componentInstance as any).scene).toBeUndefined();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
