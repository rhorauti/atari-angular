import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  @Input() showSearchIcon = true;
  @Input() showRightIcon = true;
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @Input() inputClass = 'border-gray-500';
  @Input() isEmail = false;
  @Input() isDisabled = false;
  @Output() emitInputValue = new EventEmitter<string>();

  @Input() inputValue = '';
  public showPassword = false;

  clearInput(): void {
    this.inputValue = '';
  }

  sendInputValue(inputData: Event): void {
    this.inputValue = (inputData.target as HTMLInputElement).value.trim();
    this.emitInputValue.emit(this.inputValue);
  }
}
