import { Injectable, effect } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';
import { Ui } from '../i18n/content.model';

/** Keeps the browser tab title and the page description in the current language. */
@Injectable({ providedIn: 'root' })
export class PageTitleService {
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private i18n: I18nService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.update());
    effect(() => {
      this.i18n.lang();
      this.update();
    });
  }

  private update(): void {
    const key = this.currentKey();
    const ui = this.i18n.ui;
    this.title.setTitle(ui.titles[key]);
    this.meta.updateTag({ name: 'description', content: ui.description });
  }

  /** The title key of the page that is open, as set in the route data. */
  private currentKey(): keyof Ui['titles'] {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['titleKey'] ?? 'home';
  }
}
