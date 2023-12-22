import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    ButtonStandardComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() showModal = false;
  @Input() btnNumber = 1;
  @Input() title = 'Sucesso'
  @Input() description = 'Dados registrados com sucesso! aslkj fçsakdf jasdf aasdf asdfas dsf asdf sçaskjdfç asjkd fasdçjf açsdj façsfd'
  @Input() icon = 'check'
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
