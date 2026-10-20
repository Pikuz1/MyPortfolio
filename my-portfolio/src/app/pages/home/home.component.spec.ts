import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundService } from '../../services/background.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: HTMLElement;
  let background: BackgroundService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HomeComponent] }).compileComponents();
    background = TestBed.inject(BackgroundService);
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

  it('gathers the background particles into the initials while it is open', () => {
    expect(background.formation()).toBe('initials');
  });

  it('lets the particles drift again when the visitor leaves', () => {
    fixture.destroy();
    expect(background.formation()).toBe('drift');
  });
});
