import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(private dataService: DataService, public i18n: I18nService) { }

  get about() {
    return this.dataService.getAboutMe();
  }
}
