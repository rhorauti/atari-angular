import { Component } from '@angular/core';
import {
  ICompanyTableHeaders,
  TableComponent,
} from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { RegisterCompanyApi } from '../../core/api/http/register.api';
import { HttpRequestService } from '../../core/api/http-request.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ICompany, IProduct } from '../../core/api/interfaces/IRegister';
import { MatIconModule } from '@angular/material/icon';
import { ModalFormCompanyComponent } from '../../components/modal/modal-form-company/modal-form-company.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    TableComponent,
    CommonModule,
    HttpClientModule,
    FilterComponent,
    PaginationComponent,
    ModalFormCompanyComponent,
  ],
  providers: [
    RegisterCompanyApi,
    HttpRequestService,
    MatIconModule,
    PaginationComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  constructor(private paginationComponent: PaginationComponent) {}
  public tableData = [{}];

  /**
   * getTableData
   * Função que pega os dados que vem do componente table via page customers
   * @param tableData dados que vem do componente table via props.
   */
  getTableData(tableData: ICompany[] | IProduct[]): void {
    this.tableData = tableData;
  }

  public tableHeadersData: ICompanyTableHeaders[] = [
    { id: 0, isChecked: true, name: 'Id' },
    { id: 1, isChecked: true, name: 'Cadastro' },
    { id: 2, isChecked: true, name: 'Nome' },
    { id: 3, isChecked: true, name: 'E-mail' },
    { id: 4, isChecked: true, name: 'Telefone' },
    { id: 5, isChecked: true, name: 'CPF/CNPJ' },
    { id: 6, isChecked: true, name: 'Logradouro' },
    { id: 7, isChecked: true, name: 'Numero' },
    { id: 8, isChecked: true, name: 'Complemento' },
    { id: 9, isChecked: true, name: 'Bairro' },
    { id: 10, isChecked: true, name: 'Cidade' },
    { id: 11, isChecked: true, name: 'Estado' },
    { id: 12, isChecked: true, name: 'Ação' },
  ];

  /**
   * getTableHeadersData
   * Função que pega os dados do cabeçalho que vem do componente table.
   * @param headersData dados do componente table
   */
  getTableHeadersData(headersData: ICompanyTableHeaders[]): void {
    this.tableHeadersData = headersData;
  }

  /**
   * getTableHeadersActiveStatus
   * Função que atualiza o cabeçalho da tabela ao ocultar/mostrar as colunas da tabela.
   * @param tableHeadersData dados do cabeçalho da tabela
   */
  getTableHeadersActiveStatus(tableHeadersData: ICompanyTableHeaders[]): void {
    this.tableHeadersData = tableHeadersData;
  }

  public tableInitialIdx =
    this.paginationComponent.tableIndexInfo.tableInitialIdx;

  /**
   * getTableInitialIdx
   * Função que pega o index do primeiro registro da tabela.
   * @param tableInitialIdx index do primeiro registro da tabela.
   */
  getTableInitialIdx(tableInitialIdx: number) {
    this.tableInitialIdx = tableInitialIdx;
  }

  public tableLastIdx = this.paginationComponent.tableIndexInfo.tableLastIdx;

  /**
   * getTableLastIdx
   * Função que pega o index do ultimo registro da tabela.
   * @param tableLastIdx index do ultimo registro da tabela.
   */
  getTableLastIdx(tableLastIdx: number) {
    this.tableLastIdx = tableLastIdx;
  }

  public registerId = 0;

  /**
   * getRegisterId
   * Função que pega o valor do id digitado no filtro pelo usuário.
   * @param id id digitado pelo usuário
   */
  getRegisterId(id: number): void {
    this.registerId = id;
  }

  /**
   * clearInputId
   * Função que limpa o input id do filtro ao clicar no icone "x"
   */
  clearInputId(): void {
    this.registerId = 0;
  }

  public registerName = '';

  /**
   * getRegisterName
   * Função que pega o valor do name digitado no filtro pelo usuário.
   * @param nome nome digitado pelo usuário
   */
  getRegisterName(nome: string): void {
    this.registerName = nome;
  }

  /**
   * clearInputName
   * Função que limpa o input name do filtro ao clicar no icone "x"
   */
  clearInputName(): void {
    this.registerName = '';
  }

  public isModalNewCompanyActive = false;

  /**
   * showModalNewCustomer
   * Função que mostra o modal de novo cadastro.
   * @param isTrue parâmetro true para mostrar o modal novo cadastro
   */
  showModalNewCompany(isTrue: boolean) {
    this.isModalNewCompanyActive = isTrue;
  }

  /**
   * closeModalForm
   * Função que fecha o modal de novo cadastro.
   * @param isFalse parâmetro false para mostrar o modal novo cadastro
   */
  closeModalForm(isFalse: boolean): void {
    this.isModalNewCompanyActive = isFalse;
  }

  public tableUpdated = false;

  resetPage(isTrue: boolean): void {
    this.tableUpdated = isTrue;
    this.resetPagination(isTrue);
  }

  getTableUpdatedStatus(isFalse: boolean): void {
    this.tableUpdated = isFalse;
  }

  public isPaginationReset = false;

  /**
   * resetPagination
   * Função que envia um valor boleano true para o componente pagination para resetar os valores.
   */
  resetPagination(isTrue: boolean): void {
    this.isPaginationReset = isTrue;
  }
}
