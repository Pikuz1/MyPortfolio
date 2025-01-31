import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  // Function to handle navigation
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
    this.menuOpen = false; // Close the menu after clicking (for mobile)
  }

  // Function to toggle mobile menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
