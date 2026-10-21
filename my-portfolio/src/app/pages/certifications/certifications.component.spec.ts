import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationsComponent } from './certifications.component';
import { I18nService } from '../../i18n/i18n.service';

describe('CertificationsComponent', () => {
  let component: CertificationsComponent;
  let fixture: ComponentFixture<CertificationsComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CertificationsComponent] }).compileComponents();
    fixture = TestBed.createComponent(CertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists the certifications', () => {
    expect(el.querySelectorAll('h2').length).toBe(component.certifications.length);
  });

  it('shows the German texts', () => {
    TestBed.inject(I18nService).set('de');
    fixture.detectChanges();
    expect(el.querySelector('h1')?.textContent).toContain('Zertifikate');
    expect(el.textContent).toContain('In Arbeit');
  });
});
