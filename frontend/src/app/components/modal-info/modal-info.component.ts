import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonStandardComponent,
  ],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})
export class ModalInfoComponent {

  @Input() showModal = false;
  @Input() modalIcon = 'check';
  @Input() iconModalBackgroundColor = 'bg-green-600';
  @Input() iconModalTextColor = 'text-green-100';
  @Input() btnNumber = 1;
  @Input() btnCloseLabel = '';
  @Input() btnCancelLabel = '';
  @Input() btnSuccessLabel = '';
  @Input() isIconCloseVisible = false;
  @Input() isIconCancelVisible = false;
  @Input() isIconSuccessVisible = false;
  @Input() btnCloseIcon = '';
  @Input() btnCancelIcon = '';
  @Input() btnSuccessIcon = '';
  @Input() modalTitle = 'Sucesso!'
  @Input() modalDescription = 'Dados registrados com sucesso!'
  @Output() emitCloseModal = new EventEmitter<boolean>();
  @Output() emitCancelModal = new EventEmitter<boolean>();
  @Output() emitOkModal = new EventEmitter<boolean>();

  sendCloseEmitterEvent(): void {
    this.emitCloseModal.emit(false);
  }

  sendCancelEmitterEvent(): void {
    this.emitCancelModal.emit(false);
  }

  sendOkEmitterEvent(): void {
    this.emitOkModal.emit(false);
  }

}
