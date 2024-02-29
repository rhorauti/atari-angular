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
import { SelectComponent } from '../../select/select.component';

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
    SelectComponent,
  ],
  templateUrl: './modal-form-company.component.html',
  styleUrl: './modal-form-company.component.scss',
})
export class ModalFormCompanyComponent {
  @ViewChildren('inputModal') inputModal?: QueryList<InputFormComponent>;
  @ViewChildren('selectModal') selectModal?: QueryList<SelectComponent>;

  @Input() isEditForm = false;
  public isModalCheckActive = false;
  public isModalInfoActive = false;

  @Input() companyData: ICompany = {
    id: 0,
    cadastro: new Date(),
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

  @Input() companiesData: ICompany[] = [];

  /**
   * showModalCheck
   * Abre o modal check caso o usuário tenha preenchido pelo menos o nome do usuário. Caso não, é mostrado uma mensagem para preencher pelo menos o nome.
   */
  showModalCheck(): void {
    if (this.companyData.nome.length < 3) {
      this.handleFailureModal(
        'Favor preencher o campo nome com no mínimo 3 caracteres!'
      );
      this.isModalInfoActive = true;
    } else if (
      this.companyData.email.length > 0 &&
      (!/\.com/gi.test(this.companyData.email) ||
        !/@/gi.test(this.companyData.email))
    ) {
      this.handleFailureModal('Campo e-mail inválido!');
      this.isModalInfoActive = true;
    } else if (
      this.companyData.telefone.length > 0 &&
      this.companyData.telefone.length < 19
    ) {
      this.handleFailureModal('Campo telefone inválido!');
      this.isModalInfoActive = true;
    } else if (
      this.companyData.cnpj.length > 0 &&
      (this.companyData.cnpj.length < 14 ||
        (this.companyData.cnpj.length > 14 &&
          this.companyData.cnpj.length < 18))
    ) {
      this.handleFailureModal('Campo CNPJ/CPF inválido!');
      this.isModalInfoActive = true;
    } else {
      this.isModalCheckActive = true;
    }
  }

  /**
   * closeModalCheck
   * Função que fecha o modal check ao clicar no botão cancelar
   * @param isFalse boolean false
   */
  closeModalCheck(isFalse: boolean): void {
    this.isModalCheckActive = isFalse;
  }

  @Output() closeModalFormEmitter = new EventEmitter<boolean>();

  /**
   * closeModalForm
   * Emite um evento para o componente pai para fechar o modal.
   */
  closeModalForm(): void {
    this.clearForm();
    this.closeModalFormEmitter.emit(false);
  }

  /**
   * closeModal
   * Fecha o modal info.
   * @param isFalse
   */
  closeModalInfo(isFalse: boolean): void {
    this.isModalInfoActive = isFalse;
  }

  // Variável do modal info que é acionado quando o registro é feito com sucesso.
  public isModalInfoRegisterOkActive = false;
  public modalInfoRegisterOk: IModal = {
    modalType: '',
    modalDescription: '',
  };
  @Input() isModalFormCompanyActive = false;
  @Output() updateCustomerListEmitter = new EventEmitter<boolean>();

  closeModalFormAfterOk(isFalse: boolean): void {
    this.isModalInfoActive = isFalse;
    this.isModalCheckActive = isFalse;
    this.updateCustomerListEmitter.emit(true);
    this.closeModalForm();
  }

  @Output() resetEditFormEmitter = new EventEmitter<boolean>();

  resetEditForm(): void {
    this.resetEditFormEmitter.emit(false);
  }

  /**
   * clearForm
   * Limpa o formulário modal-form
   */
  clearForm(): void {
    this.inputModal?.forEach(input => input.clearInput());
    this.selectModal?.forEach(select => select.clearSelect());
    this.companyData.id = 0;
    this.companyData.cadastro = new Date();
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

  public modalInfo: IModal = {
    modalType: '',
    modalDescription: '',
  };

  /**
   * handleSuccessModal
   * Função que popula os dados do modal e mostra para o usuário caso o registro seja validado corretamente.
   */
  handleSuccessModal(message: string): void {
    this.modalInfo = {
      modalType: 'success',
      modalDescription: message,
    };
  }

  /**
   * handleFailureModal
   * Função que popula os dados do modal e mostra para o usuário caso o registro seja validado incorretamente.
   */
  handleFailureModal(message: string): void {
    this.modalInfo = {
      modalType: 'failure',
      modalDescription: message,
    };
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
    this.companyData.cadastro = new Date(cadastro);
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
   * getSelectEstadoValue
   * Função que pega o estado enviado pelo componente input e salva no objeto companyData do modal.
   * @param estado estado da empresa
   */
  getSelectEstadoValue(estado: string): void {
    this.companyData.estado = estado;
  }
}
