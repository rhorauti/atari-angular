import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-close',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-close.component.html',
  styleUrl: './button-close.component.scss'
})
export class ButtonCloseComponent {

  @Input() label = 'Fechar';
  @Input() btnClass = '';

}
