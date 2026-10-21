import { Component, OnDestroy, OnInit } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private background: BackgroundService, public i18n: I18nService) {}

  // The background particles gather into the initials while the home page is open
  ngOnInit(): void {
    this.background.show('initials');
  }

  ngOnDestroy(): void {
    this.background.show('drift');
  }
}
