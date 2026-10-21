import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Lang, Ui } from '../../i18n/content.model';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;

  readonly languages: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' }
  ];

  readonly links: { path: string; key: keyof Ui['nav']; icon: string }[] = [
    { path: '/about', key: 'about', icon: 'fa-user' },
    { path: '/experience', key: 'experience', icon: 'fa-briefcase' },
    { path: '/projects', key: 'projects', icon: 'fa-project-diagram' },
    { path: '/skills', key: 'skills', icon: 'fa-tools' },
    { path: '/education', key: 'education', icon: 'fa-graduation-cap' },
    { path: '/certifications', key: 'certifications', icon: 'fa-certificate' },
    { path: '/contact', key: 'contact', icon: 'fa-envelope' }
  ];

  constructor(public i18n: I18nService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
