import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html'
})
export class EducationComponent {
  constructor(private dataService: DataService, public i18n: I18nService) { }

  get education() {
    return this.dataService.getEducation();
  }

  get languages() {
    return this.dataService.getLanguages();
  }
}
