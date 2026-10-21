import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { I18nService } from '../../i18n/i18n.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FooterComponent] }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to LinkedIn and GitHub', () => {
    const hrefs = Array.from(fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>)
      .map(a => a.getAttribute('href'));
    expect(hrefs).toEqual([component.contact.linkedin, component.contact.github]);
  });

  it('shows the current year in the copyright', () => {
    expect(fixture.nativeElement.textContent).toContain(`${new Date().getFullYear()} Priyanka Giri`);
  });

  it('labels the icon links in the current language', () => {
    const labels = () => Array.from(fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>)
      .map(a => a.getAttribute('aria-label'));
    expect(labels()).toEqual(['LinkedIn profile', 'GitHub profile']);
    TestBed.inject(I18nService).set('de');
    fixture.detectChanges();
    expect(labels()).toEqual(['LinkedIn-Profil', 'GitHub-Profil']);
  });
});
