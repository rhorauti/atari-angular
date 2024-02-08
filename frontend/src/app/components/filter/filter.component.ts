import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';
import { InputFormComponent } from '../input/input-form/input-form.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ButtonStandardComponent, InputFormComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() showModalNewRegisterEmitter = new EventEmitter<boolean>();

  showNewRegister(): void {
    this.showModalNewRegisterEmitter.emit(true);
  }
}
