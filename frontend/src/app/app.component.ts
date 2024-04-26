import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/menu/navbar/navbar.component';
import { FilterComponent } from './components/filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    FilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public showNavBar = true;

  constructor(private dataService: DataService) {
    this.dataService.dataService.subscribe(data => {
      this.showNavBar = data;
    });
  }
}
