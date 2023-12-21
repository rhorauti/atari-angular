import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-cancel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-cancel.component.html',
  styleUrl: './button-cancel.component.scss'
})
export class ButtonCancelComponent {

  @Input() label = 'Cancelar';
  @Input() btnClass = '';

}
