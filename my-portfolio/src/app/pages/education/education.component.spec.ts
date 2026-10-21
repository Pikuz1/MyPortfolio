import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { I18nService } from '../../i18n/i18n.service';

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

  it('shows the German texts', () => {
    TestBed.inject(I18nService).set('de');
    fixture.detectChanges();
    expect(el.querySelector('h1')?.textContent).toContain('Ausbildung');
    expect(el.textContent).toContain('Universität Paderborn');
    expect(el.textContent).toContain('Sprachen');
    expect(el.textContent).toContain('Deutsch');
  });
});
