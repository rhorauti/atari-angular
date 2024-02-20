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

  getTableHeadersData(headersData: ICompanyTableHeaders[]): void {
    this.tableHeadersData = headersData;
  }

  getTableHeadersActiveStatus(tableHeadersData: ICompanyTableHeaders[]): void {
    this.tableHeadersData = tableHeadersData;
  }

  public tableInitialIdx =
    this.paginationComponent.tableIndexInfo.tableInitialIdx;

  getTableInitialIdx(tableInitialIdx: number) {
    this.tableInitialIdx = tableInitialIdx;
  }

  public tableLastIdx = this.paginationComponent.tableIndexInfo.tableLastIdx;

  getTableLastIdx(tableLastIdx: number) {
    this.tableLastIdx = tableLastIdx;
  }

  public registerId = 0;

  getRegisterId(id: number): void {
    this.registerId = id;
  }

  clearInputId(): void {
    this.registerId = 0;
  }

  public registerName = '';

  getRegisterName(nome: string): void {
    this.registerName = nome;
  }

  clearInputName(): void {
    this.registerName = '';
  }

  public isModalNewCustomerActive = false;

  showModalNewCustomer(isTrue: boolean) {
    this.isModalNewCustomerActive = isTrue;
  }

  closeModalNewCustomer(isFalse: boolean): void {
    this.isModalNewCustomerActive = isFalse;
  }

  closeModalForm(isFalse: boolean): void {
    this.isModalNewCustomerActive = isFalse;
  }

  public tableIsUpdated = false;

  updateCustomerList(isTrue: boolean): void {
    this.tableIsUpdated = isTrue;
    this.closeModalForm(false);
  }

  changeTableUpdatedToFalse(isFalse: boolean): void {
    this.tableIsUpdated = isFalse;
  }
}
