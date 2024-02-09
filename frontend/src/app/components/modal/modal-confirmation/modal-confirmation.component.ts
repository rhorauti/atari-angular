import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ButtonStandardComponent } from '../../button/button-standard/button-standard.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ModalCheckComponent } from '../modal-check/modal-check.component';

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonStandardComponent,
    ModalBaseComponent,
    ModalCheckComponent,
  ],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.scss',
})
export class ModalConfirmationComponent implements OnChanges {
  @Input() modalType = '';
  @Input() showModal = false;
  @Input() modalIcon = 'check';
  @Input() iconModalBackgroundColor = 'bg-green-600';
  @Input() iconModalTextColor = 'text-green-100';
  @Input() modalTitle = 'Sucesso!';
  @Input() modalDescription = 'Dados registrados com sucesso!';
  @Output() emitCloseModal = new EventEmitter<boolean>();
  @Output() emitCancelModal = new EventEmitter<boolean>();
  @Output() emitOkModal = new EventEmitter<boolean>();

  ngOnChanges() {
    switch (this.modalType) {
      case 'confirmation': {
        this.modalIcon = 'question_answer';
        this.iconModalBackgroundColor = 'bg-yellow-500';
        this.iconModalTextColor = 'text-white';
        this.modalTitle = 'Alerta!';
        break;
      }
    }
  }

  sendCancelEmitterEvent(): void {
    this.emitCancelModal.emit(false);
  }

  sendOkEmitterEvent(): void {
    this.emitOkModal.emit(false);
  }
}
