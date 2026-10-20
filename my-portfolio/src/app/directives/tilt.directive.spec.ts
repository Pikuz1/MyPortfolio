import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiltDirective } from './tilt.directive';

@Component({
  standalone: true,
  imports: [TiltDirective],
  template: '<div appTilt [tiltMax]="10" style="width: 200px; height: 100px"></div>'
})
class HostComponent {}

describe('TiltDirective', () => {
  const create = (platform: string, canHover: boolean): ComponentFixture<HostComponent> => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: canHover } as MediaQueryList);
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: platform }]
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  const move = (box: HTMLElement, fraction: { x: number; y: number }) => {
    const rect = box.getBoundingClientRect();
    box.dispatchEvent(new MouseEvent('mousemove', {
      clientX: rect.left + rect.width * fraction.x,
      clientY: rect.top + rect.height * fraction.y
    }));
  };

  it('tilts towards the mouse and lifts the card', () => {
    const fixture = create('browser', true);
    const box = fixture.nativeElement.querySelector('div') as HTMLElement;

    move(box, { x: 1, y: 0 });
    expect(box.style.transform).toContain('rotateX(10deg)');
    expect(box.style.transform).toContain('rotateY(10deg)');
    expect(box.style.transform).toContain('translateY(-8px)');
  });

  it('resets when the mouse leaves', () => {
    const fixture = create('browser', true);
    const box = fixture.nativeElement.querySelector('div') as HTMLElement;

    move(box, { x: 0, y: 1 });
    box.dispatchEvent(new MouseEvent('mouseleave'));
    expect(box.style.transform).toBe('');
  });

  it('does nothing without hover support or with reduced motion', () => {
    const fixture = create('browser', false);
    const box = fixture.nativeElement.querySelector('div') as HTMLElement;

    move(box, { x: 1, y: 1 });
    expect(box.style.transform).toBe('');
  });

  it('does nothing during server-side rendering', () => {
    const fixture = create('server', true);
    const box = fixture.nativeElement.querySelector('div') as HTMLElement;

    move(box, { x: 1, y: 1 });
    expect(box.style.transform).toBe('');
    expect(window.matchMedia).not.toHaveBeenCalled();
  });
});
