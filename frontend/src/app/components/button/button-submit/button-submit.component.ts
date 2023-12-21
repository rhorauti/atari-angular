import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-submit.component.html',
  styleUrl: './button-submit.component.scss'
})
export class ButtonSubmitComponent {

  @Input() label = 'Entrar';
  @Input() btnClass = '';

}
