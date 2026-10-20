import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;

  readonly links = [
    { path: '/about', label: 'About', icon: 'fa-user' },
    { path: '/experience', label: 'Experience', icon: 'fa-briefcase' },
    { path: '/projects', label: 'Projects', icon: 'fa-project-diagram' },
    { path: '/skills', label: 'Skills', icon: 'fa-tools' },
    { path: '/education', label: 'Education', icon: 'fa-graduation-cap' },
    { path: '/certifications', label: 'Certifications', icon: 'fa-certificate' },
    { path: '/contact', label: 'Contact', icon: 'fa-envelope' }
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
