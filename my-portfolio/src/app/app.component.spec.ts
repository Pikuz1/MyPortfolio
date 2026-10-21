import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have the 'my-portfolio' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('my-portfolio');
  });

  it('renders the header, background, outlet and footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    ['app-header', 'app-three-background', 'router-outlet', 'app-footer']
      .forEach(selector => expect(el.querySelector(selector)).not.toBeNull());
    fixture.destroy();
  });

  it('keeps the footer at the bottom of a window taller than the page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const footer = host.querySelector('footer') as HTMLElement;
    expect(host.getBoundingClientRect().height).toBeGreaterThanOrEqual(window.innerHeight);
    expect(footer.getBoundingClientRect().bottom).toBeCloseTo(host.getBoundingClientRect().bottom, 0);
    fixture.destroy();
  });
});
