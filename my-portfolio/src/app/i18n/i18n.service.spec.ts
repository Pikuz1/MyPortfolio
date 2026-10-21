import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { de } from './de';
import { en } from './en';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  const create = (platform: 'browser' | 'server' = 'browser') => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: platform }] });
    return TestBed.inject(I18nService);
  };
  const browserLanguage = (language: string) => spyOnProperty(navigator, 'language').and.returnValue(language);

  it('starts in English when the browser is English', () => {
    browserLanguage('en-US');
    const service = create();
    expect(service.lang()).toBe('en');
    expect(service.content).toBe(en);
    expect(service.ui).toBe(en.ui);
  });

  it('starts in German when the browser is German', () => {
    browserLanguage('de-AT');
    const service = create();
    expect(service.lang()).toBe('de');
    expect(service.content).toBe(de);
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('de');
  });

  it('prefers the saved choice over the browser language', () => {
    browserLanguage('de-DE');
    localStorage.setItem('portfolio-language', 'en');
    expect(create().lang()).toBe('en');
  });

  it('uses a saved German choice on an English browser', () => {
    browserLanguage('en-GB');
    localStorage.setItem('portfolio-language', 'de');
    expect(create().lang()).toBe('de');
  });

  it('ignores a saved value it does not know', () => {
    browserLanguage('en-US');
    localStorage.setItem('portfolio-language', 'fr');
    expect(create().lang()).toBe('en');
  });

  it('switches language, updates the page language and remembers the choice', () => {
    browserLanguage('en-US');
    const service = create();
    service.set('de');
    expect(service.lang()).toBe('de');
    expect(service.ui.nav.about).toBe('Über mich');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('de');
    expect(localStorage.getItem('portfolio-language')).toBe('de');
  });

  it('still works when the browser blocks storage', () => {
    browserLanguage('de-DE');
    spyOn(Storage.prototype, 'getItem').and.throwError('blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('blocked');
    const service = create();
    expect(service.lang()).toBe('de');
    service.set('en');
    expect(service.lang()).toBe('en');
  });

  it('always uses English on the server', () => {
    const navigatorLanguage = browserLanguage('de-DE');
    const service = create('server');
    expect(service.lang()).toBe('en');
    expect(navigatorLanguage).not.toHaveBeenCalled();
  });
});
