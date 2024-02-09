import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { InputFormComponent } from '../../input/input-form/input-form.component';
import { ButtonStandardComponent } from '../../button/button-standard/button-standard.component';
import { ICompany } from '../../../core/api/interfaces/IRegister';
import { ModalCheckComponent } from '../modal-check/modal-check.component';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { IModal } from '../../../core/api/interfaces/IModal';
import { formatarData } from '../../../core/utils/proto';

@Component({
  selector: 'app-modal-form-company',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ModalBaseComponent,
    ModalCheckComponent,
    ModalInfoComponent,
    InputFormComponent,
    ButtonStandardComponent,
  ],
  templateUrl: './modal-form-company.component.html',
  styleUrl: './modal-form-company.component.scss',
})
export class ModalFormCompanyComponent {
  @ViewChildren('inputModal') inputModal?: QueryList<InputFormComponent>;
  @Input() showModalNewCustomer = false;
  @Output() closeModalEmitter = new EventEmitter<boolean>();
  public isModalCheckActive = false;
  public isModalInfoActive = false;
  public companyData: ICompany = {
    id: 0,
    cadastro: formatarData(new Date().toString()),
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
  public modalInfo: IModal = {
    modalType: '',
    modalDescription: '',
  };

  sendCancelEmitterEvent() {
    this.clearForm();
    this.closeModalEmitter.emit(false);
  }

  clearForm() {
    this.inputModal?.forEach(input => input.clearInput());
    this.companyData.id = 0;
    this.companyData.cadastro = new Date().toString();
    this.companyData.nome = '';
    this.companyData.email = '';
    this.companyData.telefone = '';
    this.companyData.isCnpj = false;
    this.companyData.cnpj = '';
    this.companyData.logradouro = '';
    this.companyData.numero = 0;
    this.companyData.complemento = '';
    this.companyData.bairro = '';
    this.companyData.cidade = '';
    this.companyData.estado = '';
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

  /**
   * showModalCheck
   * Abre o modal que o usuário verifica se os dados digitados estão corretos.
   */
  showModalCheck(): void {
    if (this.companyData.nome.length == 0) {
      this.handleFailureModal('Favor preencher o campo nome!');
      this.isModalInfoActive = true;
    } else {
      this.isModalCheckActive = true;
    }
  }

  /**
   * changeModalCheckStatus
   * Função que altera o status do botão presseguir do modal-form para false
   * @param isFalse status false que vem do modal check
   */
  changeModalCheckStatus(isFalse: boolean): void {
    this.isModalCheckActive = isFalse;
  }

  closeModalCheck(isFalse: boolean): void {
    this.isModalCheckActive = isFalse;
  }

  /**
   * closeModal
   * Função que fecha o modal e direciona o usuário para a tela inicial da aplicação.
   * @param isFalse
   */
  closeModalInfo(isFalse: boolean): void {
    this.isModalInfoActive = isFalse;
  }

  @Output() updateCustomerListEmitter = new EventEmitter<boolean>();

  closeModalForm(isFalse: boolean): void {
    this.showModalNewCustomer = isFalse;
    this.isModalCheckActive = isFalse;
    this.isModalInfoActive = isFalse;
    this.updateCustomerListEmitter.emit(true);
  }
  /**
   * getInputIdValue
   * Função que pega o id enviado pelo componente input e salva no objeto companyData do modal.
   * @param id id da empresa
   */
  getInputIdValue(id: string): void {
    this.companyData.id = Number(id);
  }
  /**
   * getInputCadastroValue
   * Função que pega a data do cadastro enviado pelo componente input e salva no objeto companyData do modal.
   * @param cadastro cadastro da empresa
   */
  getInputCadastroValue(cadastro: string): void {
    this.companyData.cadastro = cadastro;
  }
  /**
   * getInputNomeValue
   * Função que pega o nome enviado pelo componente input e salva no objeto companyData do modal.
   * @param nome nome da empresa
   */
  getInputNomeValue(nome: string): void {
    this.companyData.nome = nome;
  }
  /**
   * getInputEmailValue
   * Função que pega o email enviado pelo componente input e salva no objeto companyData do modal.
   * @param email email da empresa
   */
  getInputEmailValue(email: string): void {
    this.companyData.email = email;
  }
  /**
   * getInputTelefoneValue
   * Função que pega o telefone enviado pelo componente input e salva no objeto companyData do modal.
   * @param telefone telefone da empresa
   */
  getInputTelefoneValue(telefone: string): void {
    this.companyData.telefone = telefone;
  }
  /**
   * getInputLogradouroValue
   * Função que pega o logradouro enviado pelo componente input e salva no objeto companyData do modal.
   * @param logradouro logradouro da empresa
   */
  getInputLogradouroValue(logradouro: string): void {
    this.companyData.logradouro = logradouro;
  }
  /**
   * getInputCnpjValue
   * Função que pega o numero enviado pelo componente input e salva no objeto companyData do modal.
   * @param numero numero da empresa
   */
  getInputNumeroValue(numero: string): void {
    this.companyData.numero = Number(numero);
  }
  /**
   * getInputCnpjValue
   * Função que pega o email enviado pelo componente input e salva no objeto companyData do modal.
   * @param cnpj email da empresa
   */
  getInputCnpjValue(cnpj: string): void {
    this.companyData.cnpj = cnpj;
    if (this.companyData.cnpj.length > 14) {
      this.companyData.isCnpj = true;
    }
  }
  /**
   * getInputComplementoValue
   * Função que pega o complemento enviado pelo componente input e salva no objeto companyData do modal.
   * @param complemento complemento da empresa
   */
  getInputComplementoValue(complemento: string): void {
    this.companyData.complemento = complemento;
  }
  /**
   * getInputBairroValue
   * Função que pega o bairro enviado pelo componente input e salva no objeto companyData do modal.
   * @param bairro bairro da empresa
   */
  getInputBairroValue(bairro: string): void {
    this.companyData.bairro = bairro;
  }
  /**
   * getInputCidadeValue
   * Função que pega o cidade enviado pelo componente input e salva no objeto companyData do modal.
   * @param cidade cidade da empresa
   */
  getInputCidadeValue(cidade: string): void {
    this.companyData.cidade = cidade;
  }
  /**
   * getInputEstadoValue
   * Função que pega o estado enviado pelo componente input e salva no objeto companyData do modal.
   * @param estado estado da empresa
   */
  getInputEstadoValue(estado: string): void {
    this.companyData.estado = estado;
  }
}
