import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { I18nService } from '../../i18n/i18n.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectsComponent] }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one card per project', () => {
    expect(el.querySelectorAll('h2').length).toBe(component.projects.length);
  });

  it('links only the projects that have a link', () => {
    const links = el.querySelectorAll('a');
    expect(links.length).toBe(component.projects.filter(p => p.link).length);
    expect(links[0].getAttribute('href')).toBe('https://github.com/Pikuz1/Documind');
    expect(links.length).toBe(3);
  });

  it('tilts every card', () => {
    expect(el.querySelectorAll('[appTilt]').length).toBe(component.projects.length);
  });

  it('shows the German texts', () => {
    TestBed.inject(I18nService).set('de');
    fixture.detectChanges();
    expect(el.querySelector('h1')?.textContent).toContain('Projekte');
    expect(el.textContent).toContain('Mehrsprachiger Assistent');
    expect(el.querySelector('a')?.textContent).toContain('Auf GitHub ansehen');
  });
});
