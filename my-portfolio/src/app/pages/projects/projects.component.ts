import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-projects',
  standalone: true,  // Needed for importing CommonModule
  imports: [CommonModule, TiltDirective], // CommonModule for *ngFor
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  constructor(private dataService: DataService, public i18n: I18nService) { }

  get projects() {
    return this.dataService.getProjects();
  }
}
