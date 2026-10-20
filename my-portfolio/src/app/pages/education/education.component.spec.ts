import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EducationComponent] }).compileComponents();
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists schools and languages', () => {
    expect(el.textContent).toContain('Paderborn University');
    expect(el.textContent).toContain('Mumbai University');
    expect(el.textContent).toContain('English');
    expect(el.textContent).toContain('German');
  });
});
