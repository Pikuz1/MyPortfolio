import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundService } from '../services/background.service';
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

  describe('formations', () => {
    let fixture: ComponentFixture<ThreeBackgroundComponent>;
    let component: any;
    let background: BackgroundService;

    const frames = (count: number) => {
      // Skip the expensive bloom render, only the particle movement matters here
      if (!jasmine.isSpy(window.requestAnimationFrame)) {
        spyOn(window, 'requestAnimationFrame').and.returnValue(1);
        spyOn(component.composer, 'render');
      }
      for (let i = 0; i < count; i++) {
        component.animate();
      }
    };
    const positions = () => component.particleSystem.geometry.getAttribute('position').array as Float32Array;
    const closeTo = (actual: Float32Array, expected: Float32Array) =>
      actual.every((value, i) => Math.abs(value - expected[i]) < 0.001);

    beforeEach(async () => {
      fixture = await create('browser');
      component = fixture.componentInstance;
      background = TestBed.inject(BackgroundService);
      fixture.detectChanges();
    });

    afterEach(() => fixture.destroy());

    it('moves the particles into the initials and turns them to face the camera', () => {
      component.particleSystem.rotation.set(1, 1, 0);
      background.show('initials');
      frames(300);
      expect(closeTo(positions(), component.initialsPositions)).toBeTrue();
      expect(component.particleSystem.rotation.x).toBeCloseTo(0);
      expect(component.particleSystem.rotation.y).toBeCloseTo(0);
    });

    it('lets the particles drift apart again', () => {
      background.show('initials');
      frames(300);
      background.show('drift');
      frames(1);
      expect(closeTo(positions(), component.driftPositions)).toBeFalse();
      frames(300);
      expect(closeTo(positions(), component.driftPositions)).toBeTrue();
    });
  });

  describe('with reduced motion', () => {
    it('snaps to the formation, does not spin and ignores the mouse', async () => {
      spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
      const addListener = spyOn(window, 'addEventListener').and.callThrough();
      const fixture = await create('browser');
      const component: any = fixture.componentInstance;
      fixture.detectChanges();
      spyOn(window, 'requestAnimationFrame').and.returnValue(1);
      spyOn(component.composer, 'render');

      component.animate();
      expect(component.particleSystem.rotation.y).toBe(0);
      expect(addListener.calls.allArgs().some(args => args[0] === 'mousemove')).toBeFalse();

      TestBed.inject(BackgroundService).show('initials');
      component.animate();
      expect(component.particleSystem.geometry.getAttribute('position').array)
        .toEqual(component.initialsPositions);
      fixture.destroy();
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
