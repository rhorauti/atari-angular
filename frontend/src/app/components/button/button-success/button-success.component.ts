import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-success.component.html',
  styleUrl: './button-success.component.scss'
})
export class ButtonSuccessComponent {

  @Input() label = 'Ok';
  @Input() btnClass = '';

}
