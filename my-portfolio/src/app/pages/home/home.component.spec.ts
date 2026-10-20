import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HomeComponent] }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the headline and the picture', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Welcome');
    expect(el.querySelector('img')?.getAttribute('alt')).toBe('Priyanka Giri');
  });
});
