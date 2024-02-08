import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalBaseComponent } from '../modal-base/modal-base.component';

@Component({
  selector: 'app-modal-check',
  standalone: true,
  imports: [CommonModule, MatIconModule, ModalBaseComponent],
  templateUrl: './modal-check.component.html',
  styleUrl: './modal-check.component.scss',
})
export class ModalCheckComponent {}
