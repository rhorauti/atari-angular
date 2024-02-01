import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  @Input() showIconRight = true;
  @Input() iconLeft = 'lock';
  @Input() placeholder = '******';
  @Input() borderColor = 'ring-logo-blue-hover';
  @Input() isEmail = false;
  @Output() emitInputValue = new EventEmitter<string>();

  public inputValue = '';
  public showPassword = false;

  sendInputValue(inputData: Event): void {
    this.inputValue = (inputData.target as HTMLInputElement).value.trim();
    this.emitInputValue.emit(this.inputValue);
  }
}
