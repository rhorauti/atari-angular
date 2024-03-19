import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { RegisterCompanyApi } from '../../core/api/http/register.api';
import { InputFormComponent } from '../input/input-form/input-form.component';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../core/api/http-request.service';
import {
  ICompany,
  IProduct,
  IResponseCompany,
  IResponseProduct,
} from '../../core/api/interfaces/IRegister';
import { IModal } from '../../core/api/interfaces/IModal';
import { LoadingComponent } from '../loading/loading.component';
import { ModalInfoComponent } from '../modal/modal-info/modal-info.component';
import { ModalAskComponent } from '../modal/modal-ask/modal-ask.component';
import { ModalFormCompanyComponent } from '../modal/modal-form-company/modal-form-company.component';

export interface ICompanyTableHeaders {
  id: number;
  isChecked: boolean;
  name: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    InputFormComponent,
    ButtonStandardComponent,
    HttpClientModule,
    InputFormComponent,
    LoadingComponent,
    ModalInfoComponent,
    ModalAskComponent,
    ModalFormCompanyComponent,
  ],
  providers: [RegisterCompanyApi, HttpRequestService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges, OnInit {
  private registerApi = inject(RegisterCompanyApi);
  public isModalInfoActive = false;
  public isModalAskActive = false;
  // @Input() tableInitialIdx: number;
  // @Input() tableLastIdx: number;
  @Input() showLoading = false;
  @Output() tableDataEmitter = new EventEmitter<ICompany[] | IProduct[]>();
  @Input() companyTableHeaders: ICompanyTableHeaders[] = [];
  public productTableHeaders = [
    'Id',
    'Cadastro',
    'Nome',
    'cc',
    'ncm',
    'Unidade',
    'Preço',
    'Comentários',
    'Ação',
  ];

  public modalAsk: IModal = {
    modalType: '',
    modalDescription: '',
  };

  @Input() registerType = '';
  public companiesData: IResponseCompany = {
    date: '',
    status: false,
    message: '',
    data: [],
  };
  public productsData: IResponseProduct = {
    date: '',
    status: false,
    message: '',
    data: [],
  };
  public companyData: ICompany = {
    id: 0,
    cadastro: new Date(),
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
  public productData: IProduct = {
    id: 0,
    cadastro: '',
    nome: '',
    cc: '',
    ncm: '',
    unidade: '',
    preco: '',
    fileName: '',
    comentario: '',
  };

  @Output() tableHeadersDataEmitter = new EventEmitter();

  emitTableData(): void {
    switch (this.registerType) {
      case 'customers':
      case 'suppliers': {
        this.tableHeadersDataEmitter.emit(this.companyTableHeaders);
        break;
      }
      case 'supplier-products':
      case 'customer-products': {
        this.tableHeadersDataEmitter.emit(this.productTableHeaders);
        break;
      }
      default:
        'customers';
    }
  }

  @Input() tableUpdated = false;
  @Output() tableUpdatedEmitter = new EventEmitter<boolean>();

  async resetTable(): Promise<void> {
    await this.getList();
    this.emitTableData();
    this.tableUpdatedEmitter.emit(false);
  }

  public initialTableData: ICompany[] = [];

  async ngOnInit(): Promise<void> {
    await this.resetTable();
    switch (this.registerType) {
      case 'customers':
      case 'suppliers': {
        this.initialTableData = this.companiesData.data;
        this.filterTable();
      }
    }
  }

  @Input() inputValueFilter: string | number;
  @Input() selectValueFilter = '';
  public companiesDataFilter: ICompany[] = [];

  // filterTable(): void {
  //   this.companiesDataFilter = this.initialTableData;
  //   if (this.inputValueFilter && String(this.inputValueFilter).length == 0) {
  //     this.companiesDataFilter = this.companiesData.data;
  //   } else {
  //     const filterData = this.companiesData.data.filter(company =>
  //       String(company[this.selectValueFilter.toLowerCase() as keyof ICompany])
  //         .toLowerCase()
  //         .includes(String(this.inputValueFilter).toLowerCase().trim())
  //     );
  //     this.companiesDataFilter = filterData;
  //   }
  //   console.log(this.companiesDataFilter);
  //   this.tableDataEmitter.emit(this.companiesDataFilter);
  // }

  public tableInitialIdx = 0;

  findInitialIdx(): number {
    if (this.currentPage == 1) {
      return (this.tableInitialIdx = 0);
    } else {
      return (this.tableInitialIdx =
        (this.currentPage - 1) * this.qtyRegisterPerPage);
    }
  }

  public tableLastIdx = 8;

  findLastIdx(): number {
    return (this.tableLastIdx = this.currentPage * this.qtyRegisterPerPage);
  }

  public lastPage = 0;
  @Output() lastPageEmitter = new EventEmitter<number>();

  findLastPage(tableData: Record<string, any>[]): number {
    this.lastPage = Math.ceil(tableData.length / this.qtyRegisterPerPage);
    this.lastPageEmitter.emit(this.lastPage);
    return this.lastPage;
  }

  @Input() currentPage: number;
  public qtyRegisterPerPage = 8;

  // verificar
  filterTable(): ICompany[] {
    console.log(this.currentPage);
    if (!this.inputValueFilter) {
      this.currentPage = 1;
      this.findLastPage(this.initialTableData);
      return (this.companiesDataFilter = this.initialTableData.slice(
        this.tableInitialIdx,
        this.tableLastIdx
      ));
    } else {
      const filterData = this.companiesData.data
        .filter(company =>
          String(
            company[this.selectValueFilter.toLowerCase() as keyof ICompany]
          )
            .toLowerCase()
            .includes(String(this.inputValueFilter).toLowerCase().trim())
        )
        .slice(this.tableInitialIdx, this.tableLastIdx);
      console.log(this.currentPage);
      this.findInitialIdx();
      this.findLastIdx();
      this.findLastPage(filterData);
      return (this.companiesDataFilter = filterData);
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const currentValuePage = changes['currentPage']?.currentValue ?? 0;
    const previousValuePage = changes['currentPage']?.previousValue ?? 0;
    const currentValueInput = changes['inputValueFilter']?.currentValue ?? 0;
    const previousValueInput = changes['inputValueFilter']?.previousValue ?? 0;
    if (this.tableUpdated) {
      await this.resetTable();
    } else if (
      currentValueInput != previousValueInput ||
      currentValuePage != previousValuePage
    ) {
      if (currentValueInput != previousValueInput) {
        this.currentPage = 1;
      }
      this.findInitialIdx();
      this.findLastIdx();
      this.filterTable();
    }
  }

  @Output() resetPaginationEmitter = new EventEmitter<boolean>();

  resetPage(isTrue: boolean): void {
    this.isEditForm = false;
    this.resetTable();
    this.resetPaginationEmitter.emit(isTrue);
  }

  showModalAskToDeleteCompany(company: ICompany): void {
    switch (this.registerType) {
      case 'customers':
      case 'suppliers': {
        this.companyData = company;
        this.modalAsk.modalType = 'confirmation';
        this.modalAsk.modalDescription = `Deseja excluir ${this.companyData.nome}?`;
        this.isModalAskActive = true;
        break;
      }
    }
  }

  showModalAskToDeleteProduct(product: IProduct): void {
    switch (this.registerType) {
      case 'supplier-products':
      case 'customer-products': {
        this.productData = product;
        this.modalAsk.modalType = 'confirmation';
        this.modalAsk.modalDescription = `Deseja excluir ${this.productData.nome}?`;
        this.isModalAskActive = true;
        break;
      }
    }
  }

  public isModalFormCompanyActive = false;
  public isEditForm = false;

  showModalFormToEditCompany(companyData: ICompany): void {
    this.companyData = { ...companyData };
    this.isEditForm = true;
    this.isModalFormCompanyActive = true;
  }

  public isModalFormProductActive = false;

  showModalFormToEditProduct(productData: IProduct): void {
    this.productData = productData;
    this.isModalFormProductActive = true;
  }
  /**
   * okModalConfirmation
   * Método que salva a ação solicitada.
   */
  async OnModalAskActionOk(): Promise<void> {
    switch (this.registerType) {
      case 'customers':
      case 'suppliers': {
        await this.delete(this.companyData.id);
        this.isModalAskActive = false;
        this.resetTable();
        break;
      }
    }
  }

  public modalInfo: IModal = {
    modalType: '',
    modalDescription: '',
  };

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
   * getCustomers
   * Solicita um lista de clientes registrados no banco de dados.
   * @returns Promise de sucesso com status, mensagem e array de dados cadastrais do cliente. No caso de erro, retorna somente o status e mensagem.
   */
  async getList(): Promise<void> {
    try {
      this.showLoading = true;
      switch (this.registerType) {
        case 'customers': {
          const customersData =
            await this.registerApi.getRegisterCompanyList('customers');
          this.companiesData.data = customersData.data;
          this.companiesDataFilter = this.companiesData.data;
          break;
        }
        case 'suppliers': {
          const suppliersData =
            await this.registerApi.getRegisterCompanyList('suppliers');
          this.companiesData.data = suppliersData.data;
          this.companiesDataFilter = this.companiesData.data;
          break;
        }
        case 'supplier-products': {
          const supplierProdutcsData =
            await this.registerApi.getRegisterProductsList('supplier-products');
          this.productsData.data = supplierProdutcsData.data;
          break;
        }
        case 'customer-products': {
          const customerProdutcsData =
            await this.registerApi.getRegisterProductsList('customer-products');
          this.productsData.data = customerProdutcsData.data;
          break;
        }
        default:
          'customers';
      }
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
    } finally {
      this.showLoading = false;
    }
  }

  async addNew() {
    try {
      this.showLoading = true;
      switch (this.registerType) {
        case 'customers': {
          const customersData = await this.registerApi.addNewCompany(
            this.companyData,
            'customers'
          );
          this.handleSuccessModal(customersData.message);
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.addNewCompany(
            this.companyData,
            'suppliers'
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.addNewCompany(
            this.companyData,
            'supplier-products'
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcData = await this.registerApi.addNewCompany(
            this.companyData,
            'customer-products'
          );
          this.handleSuccessModal(customerProdutcData.message);
          break;
        }
        default:
          'customers';
      }
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
    } finally {
      this.showLoading = false;
    }
  }

  async update() {
    try {
      this.showLoading = true;
      switch (this.registerType) {
        case 'customers': {
          const customerData = await this.registerApi.updateCompany(
            this.companyData,
            'customers',
            this.companyData.id
          );
          this.handleSuccessModal(customerData.message);
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.updateCompany(
            this.companyData,
            'suppliers',
            this.companyData.id
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.updateProduct(
            this.productData,
            'supplier-products',
            this.productData.id
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcData = await this.registerApi.updateProduct(
            this.productData,
            'customer-products',
            this.productData.id
          );
          this.handleSuccessModal(customerProdutcData.message);
          break;
        }
        default:
          'customers';
      }
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
    } finally {
      this.showLoading = false;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      this.showLoading = true;
      switch (this.registerType) {
        case 'customers': {
          const customerData = await this.registerApi.deleteRegister(
            'customers',
            id.toString()
          );
          this.handleSuccessModal(customerData.message);
          this.isModalInfoActive = true;
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.deleteRegister(
            'suppliers',
            id.toString()
          );
          this.handleSuccessModal(supplierData.message);
          this.isModalInfoActive = true;
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.deleteRegister(
            'supplier-products',
            id.toString()
          );
          this.handleSuccessModal(supplierProdutcData.message);
          this.isModalInfoActive = true;
          break;
        }
        case 'customer-products': {
          const customerProdutcsData = await this.registerApi.deleteRegister(
            'customer-products',
            id.toString()
          );
          this.handleFailureModal(customerProdutcsData.message);
          this.isModalInfoActive = true;
          break;
        }
        default:
          'customer';
      }
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
      this.isModalInfoActive = true;
    } finally {
      this.showLoading = false;
    }
  }
}
