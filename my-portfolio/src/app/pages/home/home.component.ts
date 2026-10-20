import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private background: BackgroundService) {}

  // The background particles gather into the initials while the home page is open
  ngOnInit(): void {
    this.background.show('initials');
  }

  ngOnDestroy(): void {
    this.background.show('drift');
  }
}
