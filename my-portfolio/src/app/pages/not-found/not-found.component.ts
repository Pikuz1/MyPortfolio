import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="glass-section glass-section--narrow text-center">
      <h1 class="text-4xl font-bold mb-4">{{ i18n.ui.notFound.title }}</h1>
      <p class="mb-6">{{ i18n.ui.notFound.text }}</p>
      <a routerLink="/" class="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
        {{ i18n.ui.notFound.back }}
      </a>
    </section>
  `
})
export class NotFoundComponent {
  constructor(public i18n: I18nService) {}
}
