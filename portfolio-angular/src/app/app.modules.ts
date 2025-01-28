import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component'; // Import Standalone Component

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AppComponent // ✅ Import standalone component instead of declaring it
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
