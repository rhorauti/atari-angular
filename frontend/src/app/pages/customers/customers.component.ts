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
  public tableData = [{}];
  public selectValue = '';

  public tableHeadersData: ICompanyTableHeaders[] = [
    { id: 0, isChecked: true, name: 'Id' },
    { id: 1, isChecked: true, name: 'Cadastro' },
    { id: 2, isChecked: true, name: 'Nome' },
    { id: 3, isChecked: true, name: 'Email' },
    { id: 4, isChecked: true, name: 'Telefone' },
    { id: 5, isChecked: false, name: 'CNPJ' },
    { id: 6, isChecked: false, name: 'Logradouro' },
    { id: 7, isChecked: false, name: 'Numero' },
    { id: 8, isChecked: false, name: 'Complemento' },
    { id: 9, isChecked: false, name: 'Bairro' },
    { id: 10, isChecked: true, name: 'Cidade' },
    { id: 11, isChecked: true, name: 'Estado' },
    { id: 12, isChecked: true, name: 'Ação' },
  ];

  public inputValue: number | string;
  public isModalNewCompanyActive = false;
  public tableUpdated = false;
  public isCurrentPageReset = false;

  public tableInitialIdx: number;
  public tableLastIdx: number;
  public currentPage: number;
  public lastPage: number;
}
