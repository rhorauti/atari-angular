import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { ButtonStandardComponent } from '../../button/button-standard/button-standard.component';
import { ICompany } from '../../../core/api/interfaces/IRegister';
import { RegisterCompanyApi } from '../../../core/api/http/register.api';
import { LoadingComponent } from '../../loading/loading.component';
import { IModal } from '../../../core/api/interfaces/IModal';
import { ModalInfoComponent } from '../modal-info/modal-info.component';

interface IFormData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-modal-check',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ModalBaseComponent,
    ModalInfoComponent,
    ButtonStandardComponent,
    LoadingComponent,
  ],
  providers: [RegisterCompanyApi],
  templateUrl: './modal-check.component.html',
  styleUrl: './modal-check.component.scss',
})
export class ModalCheckComponent implements OnChanges {
  constructor(private registerCompanyApi: RegisterCompanyApi) {}
  @Input() isModalCheckActive = false;
  @Input() companyData: ICompany = {
    id: 0,
    cadastro: '',
    nome: '',
    email: '',
    telefone: '',
    isCnpj: false,
    cnpj: '',
    logradouro: '',
    numero: 0,
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  };
  @Output() closeModalCheckEmitter = new EventEmitter<boolean>();
  @Output() changeBtnProsseguirStatusEmitter = new EventEmitter<boolean>();
  public firstIdx1 = 0;
  public firstIdx2 = 0;
  public lastIdx1 = 0;
  public lastIdx2 = 0;
  public sizeArrayFormData = 8;
  public arrayFormData: IFormData[] = [{ title: '', description: '' }];
  public showLoading = false;
  public isModalInfoActive = false;
  public modalInfo: IModal = {
    modalType: '',
    modalDescription: '',
  };

  ngOnChanges() {
    const arrayKeys = Object.keys(this.companyData);
    const arrayValues = Object.values(this.companyData);
    this.arrayFormData = arrayKeys.map((key, idx) => ({
      title: key,
      description: arrayValues[idx],
    }));
    if (this.arrayFormData.length > this.sizeArrayFormData) {
      this.lastIdx1 = Math.ceil(this.arrayFormData.length / 2);
      this.firstIdx2 = this.lastIdx1;
      this.lastIdx2 = this.arrayFormData.length;
    }
  }

  showModalCheck() {
    this.isModalCheckActive = true;
  }

  closeModalCheck() {
    this.closeModalCheckEmitter.emit(false);
  }

  /**
   * handleSuccessModal
   * Função que popula os dados do modal no caso de email ou senha validados corretamente.
   */
  handleSuccessModal(message: string): void {
    this.modalInfo = {
      modalType: 'success',
      modalDescription: message,
    };
  }

  /**
   * handleFailureModal
   * Função que popula os dados do modal no caso de email ou senha digitados incorretamente.
   */
  handleFailureModal(message: string): void {
    this.modalInfo = {
      modalType: 'failure',
      modalDescription: message,
    };
  }

  public isRegisterSuccess = false;

  async registerData() {
    this.showLoading = true;
    try {
      const newRegisterResponse = await this.registerCompanyApi.addNewRegister(
        this.companyData,
        'customers'
      );
      this.handleSuccessModal(newRegisterResponse.message);
      this.isModalInfoActive = true;
      this.isRegisterSuccess = true;
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
      this.isModalInfoActive = true;
    } finally {
      this.showLoading = false;
    }
  }

  @Output() closeModalFormEmitter = new EventEmitter<boolean>();

  closeModalInfo(isFalse: boolean): void {
    this.isModalCheckActive = isFalse;
    this.isModalInfoActive = isFalse;
    if (!this.isRegisterSuccess) {
      this.changeBtnProsseguirStatusEmitter.emit(false);
    } else {
      this.closeModalFormEmitter.emit(false);
    }
  }
}
