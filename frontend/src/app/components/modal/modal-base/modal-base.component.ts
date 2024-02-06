import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-base',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './modal-base.component.html',
  styleUrl: './modal-base.component.scss',
})
export class ModalBaseComponent {
  @Input() showModal = false;
  @Input() footerClass = '';
  @Input() bodyClass = '';
}
