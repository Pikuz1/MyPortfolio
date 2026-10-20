import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationsComponent } from './certifications.component';

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
});
