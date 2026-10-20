import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="glass-section text-center">
      <h1 class="text-4xl font-bold mb-4">Page not found</h1>
      <p class="mb-6">The page you are looking for does not exist.</p>
      <a routerLink="/" class="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
        Back to home
      </a>
    </section>
  `
})
export class NotFoundComponent {}
