import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
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

  public tableInitialIdx =
    this.paginationComponent.tableIndexInfo.tableInitialIdx;

  getTableInitialIdx(tableInitialIdx: number) {
    this.tableInitialIdx = tableInitialIdx;
  }

  public tableLastIdx = this.paginationComponent.tableIndexInfo.tableLastIdx;

  getTableLastIdx(tableLastIdx: number) {
    this.tableLastIdx = tableLastIdx;
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
