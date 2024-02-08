import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonStandardComponent } from '../../button/button-standard/button-standard.component';
import { ModalBaseComponent } from '../modal-base/modal-base.component';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonStandardComponent,
    ModalBaseComponent,
  ],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss',
})
export class ModalInfoComponent implements OnChanges {
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
      case 'success': {
        this.modalIcon = 'check';
        this.modalTitle = 'Sucesso!';
        this.iconModalBackgroundColor = 'bg-green-600';
        this.iconModalTextColor = 'text-green-100';
        break;
      }
      case 'failure': {
        this.modalIcon = 'close';
        this.modalTitle = 'Erro!';
        this.iconModalBackgroundColor = 'bg-red-500';
        this.iconModalTextColor = 'text-white';
        break;
      }
    }
  }

  sendCloseEmitterEvent(): void {
    this.emitCloseModal.emit(false);
  }
}
