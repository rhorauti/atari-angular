import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonStandardComponent } from '../../components/button/button-standard/button-standard.component';
import { InputAddonsComponent } from '../../components/input/input-addons/input-addons.component';

@Component({
  selector: 'app-purchased-products',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonStandardComponent,
    InputAddonsComponent,
  ],
  templateUrl: './purchased-products.component.html',
  styleUrl: './purchased-products.component.scss',
})
export class PurchasedProductsComponent {}
