import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,  // Needed for importing CommonModule
  imports: [CommonModule], // Import CommonModule for *ngFor
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  constructor(private dataService: DataService, public i18n: I18nService) { }

  get experiences() {
    return this.dataService.getExperience();
  }
}
