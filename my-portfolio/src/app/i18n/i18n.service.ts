import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Content, Lang, Ui } from './content.model';
import { de } from './de';
import { en } from './en';

const STORAGE_KEY = 'portfolio-language';
const CONTENT: Record<Lang, Content> = { en, de };

/** Holds the language the visitor picked and serves the matching texts. */
@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>('en');

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    // The server always renders English. In the browser we use the saved choice or the browser language.
    if (isPlatformBrowser(platformId)) {
      this.lang.set(this.savedLanguage() ?? (navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'));
      this.document.documentElement.lang = this.lang();
    }
  }

  get content(): Content {
    return CONTENT[this.lang()];
  }

  get ui(): Ui {
    return this.content.ui;
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be blocked, for example in private mode. The choice then only lasts for this visit.
    }
  }

  private savedLanguage(): Lang | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'de' || saved === 'en' ? saved : null;
    } catch {
      return null;
    }
  }
}
