import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, PLATFORM_ID } from '@angular/core';

/** Tilts an element towards the mouse. Does nothing on touch screens or with reduced motion. */
@Directive({
  selector: '[appTilt]',
  standalone: true,
  host: {
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'reset()'
  }
})
export class TiltDirective {
  @Input() tiltMax = 8;

  private readonly enabled: boolean;

  constructor(private element: ElementRef<HTMLElement>, @Inject(PLATFORM_ID) platformId: object) {
    this.enabled = isPlatformBrowser(platformId)
      && window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;
  }

  onMove(event: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    const rect = this.element.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.element.nativeElement.style.transform =
      `perspective(900px) rotateX(${-y * 2 * this.tiltMax}deg) rotateY(${x * 2 * this.tiltMax}deg) translateY(-8px)`;
  }

  reset(): void {
    this.element.nativeElement.style.transform = '';
  }
}
