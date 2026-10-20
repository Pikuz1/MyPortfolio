import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: Router, useValue: router }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles the mobile menu', () => {
    expect(component.menuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('navigates and closes the menu', () => {
    component.menuOpen = true;
    component.navigateTo('about');
    expect(router.navigate).toHaveBeenCalledWith(['/about']);
    expect(component.menuOpen).toBeFalse();
  });

  it('navigates when a link is clicked', () => {
    const links = fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLElement>;
    expect(links.length).toBe(8);
    links[1].click();
    expect(router.navigate).toHaveBeenCalledWith(['/about']);
  });

  it('shows the menu when the burger button is clicked', () => {
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();
  });
});
