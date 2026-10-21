import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { I18nService } from '../../i18n/i18n.service';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([{ path: 'about', component: DummyComponent }])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders real links for the logo and every page', () => {
    const hrefs = Array.from(el.querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(['/', ...component.links.map(l => l.path)]);
  });

  it('toggles the mobile menu and reports it to assistive technology', () => {
    const button = el.querySelector('button[aria-controls]') as HTMLButtonElement;
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('#nav-links')?.classList).toContain('block');

    button.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse();
    expect(el.querySelector('#nav-links')?.classList).toContain('hidden');
  });

  it('shows the full menu from 1024px up and the burger button below that', () => {
    expect(el.querySelector('button[aria-controls]')?.classList).toContain('lg:hidden');
    expect(el.querySelector('#nav-links')?.classList).toContain('lg:flex');
  });

  it('closes the menu when a link is clicked', () => {
    component.menuOpen = true;
    (el.querySelectorAll('a')[1] as HTMLAnchorElement).click();
    expect(component.menuOpen).toBeFalse();
  });

  it('closes the menu when the logo is clicked', () => {
    component.menuOpen = true;
    (el.querySelector('a') as HTMLAnchorElement).click();
    expect(component.menuOpen).toBeFalse();
  });

  it('highlights the link of the current page', async () => {
    await TestBed.inject(Router).navigateByUrl('/about');
    fixture.detectChanges();
    const about = el.querySelector('a[href="/about"]') as HTMLAnchorElement;
    expect(about.classList).toContain('text-cyan-300');
  });

  describe('language switch', () => {
    const buttons = () => Array.from(el.querySelectorAll('[role="group"] button')) as HTMLButtonElement[];

    it('offers English and German and marks the current one', () => {
      expect(buttons().map(b => b.textContent?.trim())).toEqual(['EN', 'DE']);
      expect(buttons().map(b => b.getAttribute('aria-pressed'))).toEqual(['true', 'false']);
      expect(buttons().map(b => b.getAttribute('lang'))).toEqual(['en', 'de']);
    });

    it('switches the whole menu to German and back', () => {
      buttons()[1].click();
      fixture.detectChanges();
      expect(TestBed.inject(I18nService).lang()).toBe('de');
      expect(buttons().map(b => b.getAttribute('aria-pressed'))).toEqual(['false', 'true']);
      expect(el.textContent).toContain('Über mich');
      expect(el.textContent).toContain('Fähigkeiten');
      expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('Hauptmenü');
      expect(el.querySelector('[role="group"]')?.getAttribute('aria-label')).toBe('Sprache');

      buttons()[0].click();
      fixture.detectChanges();
      expect(el.textContent).toContain('About');
      expect(el.querySelector('button[aria-controls]')?.getAttribute('aria-label')).toBe('Toggle menu');
    });
  });
});
