import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

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
});
