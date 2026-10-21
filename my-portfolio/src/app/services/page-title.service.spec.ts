import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { PageTitleService } from './page-title.service';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('PageTitleService', () => {
  let router: Router;
  let title: Title;
  let meta: Meta;
  let i18n: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: DummyComponent, data: { titleKey: 'home' } },
          { path: 'about', component: DummyComponent, data: { titleKey: 'about' } },
          { path: 'untitled', component: DummyComponent }
        ])
      ]
    });
    TestBed.inject(PageTitleService);
    router = TestBed.inject(Router);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
    i18n = TestBed.inject(I18nService);
    i18n.set('en');
  });

  it('sets the title of the page that was opened', async () => {
    await router.navigateByUrl('/about');
    expect(title.getTitle()).toBe('About | Priyanka Giri');
  });

  it('falls back to the home title for a page without a title key', async () => {
    await router.navigateByUrl('/untitled');
    expect(title.getTitle()).toBe(i18n.ui.titles.home);
  });

  it('changes the title and the description when the language changes', async () => {
    await router.navigateByUrl('/about');
    i18n.set('de');
    TestBed.flushEffects();
    expect(title.getTitle()).toBe('Über mich | Priyanka Giri');
    expect(meta.getTag('name="description"')?.content).toContain('KI-Engineer');

    i18n.set('en');
    TestBed.flushEffects();
    expect(title.getTitle()).toBe('About | Priyanka Giri');
    expect(meta.getTag('name="description"')?.content).toContain('AI engineer');
  });
});
