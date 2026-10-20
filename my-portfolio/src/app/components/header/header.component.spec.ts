import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HeaderComponent } from './header.component';

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
    const button = el.querySelector('button') as HTMLButtonElement;
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
});
