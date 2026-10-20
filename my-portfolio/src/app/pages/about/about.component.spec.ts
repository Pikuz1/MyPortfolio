import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

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
    expect(el.querySelectorAll('section > .container.mt-6 p').length).toBe(component.about.description.length);
  });

  it('renders the How I Work cards', () => {
    expect(el.textContent).toContain('How I Work');
    expect(el.querySelectorAll('h3').length).toBe(component.about.howIWork.length);
  });

  it('offers the resume for download', () => {
    const link = el.querySelector('a[download]') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(component.about.resumeLink);
  });
});
