import { Component } from '@angular/core';
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
  about = this.dataService.getAboutMe();

  constructor(private dataService: DataService) { }
}
