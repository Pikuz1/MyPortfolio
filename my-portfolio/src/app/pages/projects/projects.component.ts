import { Component } from '@angular/core';
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
  projects = this.dataService.getProjects();

  constructor(private dataService: DataService) { }
}
