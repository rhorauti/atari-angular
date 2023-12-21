import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonCancelComponent } from '../button/button-cancel/button-cancel.component';
import { ButtonCloseComponent } from '../button/button-close/button-close.component';
import { ButtonSuccessComponent } from '../button/button-success/button-success.component';
import { ButtonSubmitComponent } from '../button/button-submit/button-submit.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    ButtonCancelComponent,
    ButtonCloseComponent,
    ButtonSuccessComponent,
    ButtonSubmitComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() showModal = false;
  @Input() butNumber = 1;
  @Input() title = 'Sucesso'
  @Input() description = 'Dados registrados com sucesso!'
  @Input() icon = 'check'
  @Output() emitCloseModal = new EventEmitter<boolean>();

  sendEmitterEvent() {
    this.emitCloseModal.emit(true);
  }

}
