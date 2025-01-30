import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html'
})
export class CertificationsComponent {
  certifications = this.dataService.getCertifications();

  constructor(private dataService: DataService) { }
}
