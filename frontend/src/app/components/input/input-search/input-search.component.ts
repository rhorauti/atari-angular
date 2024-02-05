import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  @Input() showSearchIcon = true;
  @Input() showRightIcon = true;
  @Input() placeholder = '';
  @Input() borderColor = 'border-gray-500';
  @Input() isEmail = false;
  @Output() emitInputValue = new EventEmitter<string>();

  public inputValue = '';
  public showPassword = false;

  clearInput(): void {
    this.inputValue = '';
  }

  sendInputValue(inputData: Event): void {
    this.inputValue = (inputData.target as HTMLInputElement).value.trim();
    this.emitInputValue.emit(this.inputValue);
  }
}
