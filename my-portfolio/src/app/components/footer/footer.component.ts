import { Component } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  contact = this.dataService.getContact(); // Fetch contact data
  year = new Date().getFullYear();

  constructor(private dataService: DataService, public i18n: I18nService) { }
}
