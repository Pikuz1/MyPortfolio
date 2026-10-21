import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { I18nService } from '../../i18n/i18n.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AboutComponent] }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the name, role and paragraphs', () => {
    expect(el.querySelector('h1')?.textContent).toContain(component.about.name);
    expect(el.querySelector('h2')?.textContent).toContain('AI Engineer');
    expect(el.querySelectorAll('section .about-text p').length).toBe(component.about.description.length);
  });

  it('shows the portrait with the name as its alt text', () => {
    const photo = el.querySelector('img') as HTMLImageElement;
    expect(photo.getAttribute('src')).toBe(component.about.photo);
    expect(photo.alt).toBe(component.about.name);
    expect(photo.hasAttribute('appTilt')).toBeTrue();
  });

  it('renders the How I Work cards', () => {
        expect(el.querySelectorAll('.xl\\:col-span-4 h3').length).toBe(component.about.howIWork.length);
    expect(el.textContent).toContain('Working with me');
  });

  it('offers the resume for download', () => {
    const link = el.querySelector('a[download]') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(component.about.resumeLink);
  });

  it('lists the tools I use most', () => {
    const tools = Array.from(el.querySelectorAll('li')).map(li => li.textContent?.trim());
    expect(tools).toEqual(component.about.tools);
    expect(el.textContent).toContain('Tools I use most');
  });

  it('switches to German', () => {
    TestBed.inject(I18nService).set('de');
    fixture.detectChanges();
    expect(el.querySelector('h2')?.textContent).toContain('KI-Engineer');
    expect(el.textContent).toContain('So arbeite ich');
    expect(el.textContent).toContain('Damit arbeite ich am meisten');
    expect(el.querySelector('a[download]')?.textContent).toContain('Lebenslauf herunterladen');
  });

  it('keeps the paragraphs, the cards and the tools the same in German', () => {
    const english = el.querySelectorAll('.about-text p').length;
    TestBed.inject(I18nService).set('de');
    fixture.detectChanges();
    expect(el.querySelectorAll('.about-text p').length).toBe(english);
    expect(el.querySelectorAll('.xl\\:col-span-4 h3').length).toBe(4);
  });
});
