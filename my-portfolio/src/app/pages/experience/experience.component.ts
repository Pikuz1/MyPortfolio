import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,  // Needed for importing CommonModule
  imports: [CommonModule], // Import CommonModule for *ngFor
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  experiences = this.dataService.getExperience();

  constructor(private dataService: DataService) { }
}
