import { Component } from '@angular/core';
import { PageTitleService } from './services/page-title.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ThreeBackgroundComponent } from "./three-background/three-background.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ThreeBackgroundComponent],
  // The page is at least as tall as the window, so the footer sits at the bottom of short pages
  host: { class: 'flex flex-col min-h-screen min-h-dvh' },
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-portfolio';

  // Creating the service is enough: it keeps the tab title in the right language
  constructor(_pageTitle: PageTitleService) {}
}
