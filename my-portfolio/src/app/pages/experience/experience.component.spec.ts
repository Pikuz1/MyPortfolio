import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ExperienceComponent] }).compileComponents();
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one card per job', () => {
    expect(el.querySelectorAll('h2').length).toBe(component.experiences.length);
    expect(el.textContent).toContain('Specter Automation');
  });

  it('shows the location with the duration when there is one', () => {
    expect(el.textContent).toContain('Hamburg, Germany | Oct 2025 - Jun 2026');
    expect(el.textContent).toContain('Dec 2017 - Dec 2018');
    expect(el.textContent).not.toContain('| Dec 2017');
  });
});
