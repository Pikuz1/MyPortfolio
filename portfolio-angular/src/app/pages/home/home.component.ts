import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true, // Mark this as standalone
  imports: [CommonModule], // Import CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  technicalSkills: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.technicalSkills = this.dataService.getTechnicalSkills();
  }
}
