import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
  });

  it('explains the problem and links home', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toContain('Page not found');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/');
  });
});
