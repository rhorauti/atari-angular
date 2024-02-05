import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';
import { InputSearchComponent } from '../input/input-search/input-search.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ButtonStandardComponent, InputSearchComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {}
