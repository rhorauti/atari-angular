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

@Component({
  selector: 'app-modal-form-company',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ModalBaseComponent,
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
  public isConfirmationBoxActive = false;
  public companyData: ICompany = {
    id: 0,
    cadastro: '',
    nome: '',
    email: '',
    telefone: '',
    isCnpj: true,
    cnpj: '',
    logradouro: '',
    numero: 0,
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  };

  sendCancelEmitterEvent() {
    this.closeModalEmitter.emit(false);
  }

  clearForm() {
    this.inputModal?.forEach(input => input.clearInput());
  }

  showConfirmationBox() {
    this.isConfirmationBoxActive = true;
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
