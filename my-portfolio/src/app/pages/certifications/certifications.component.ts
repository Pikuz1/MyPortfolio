import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html'
})
export class CertificationsComponent {
  constructor(private dataService: DataService, public i18n: I18nService) { }

  get certifications() {
    return this.dataService.getCertifications();
  }
}
