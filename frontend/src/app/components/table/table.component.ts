import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
import { PaginationComponent } from '../pagination/pagination.component';
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
  providers: [RegisterCompanyApi, HttpRequestService, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges, OnInit {
  private registerApi = inject(RegisterCompanyApi);
  private paginationComponent = inject(PaginationComponent);
  public isModalInfoActive = false;
  public isModalAskActive = false;
  @Input() tableInitialIdx =
    this.paginationComponent.tableIndexInfo.tableInitialIdx;
  @Input() tableLastIdx = this.paginationComponent.tableIndexInfo.tableLastIdx;
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
        this.tableDataEmitter.emit(this.companiesDataFilter);
        this.tableHeadersDataEmitter.emit(this.companyTableHeaders);
        break;
      }
      case 'supplier-products':
      case 'customer-products': {
        this.tableDataEmitter.emit(this.productsData.data);
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
    this.companiesDataFilter = this.companiesData.data;
    this.emitTableData();
    this.tableUpdatedEmitter.emit(false);
  }

  async ngOnInit(): Promise<void> {
    await this.resetTable();
  }

  @Input() registerIdFilter = 0;
  @Input() registerNameFilter = '';

  public companiesDataFilter: ICompany[] = [];

  filterTable(): void {
    if (this.registerIdFilter == 0 && this.registerNameFilter.length == 0) {
      this.companiesDataFilter = this.companiesData.data;
    } else if (this.registerIdFilter == 0) {
      this.companiesDataFilter = this.companiesData.data.filter(company =>
        company.nome
          .toLowerCase()
          .includes(this.registerNameFilter.toLowerCase())
      );
    } else {
      this.companiesDataFilter = this.companiesData.data.filter(
        company =>
          company.id.toString().includes(this.registerIdFilter.toString()) &&
          company.nome
            .toLowerCase()
            .includes(this.registerNameFilter.toLowerCase())
      );
    }
    this.tableDataEmitter.emit(this.companiesDataFilter);
  }

  async ngOnChanges(): Promise<void> {
    if (this.tableUpdated) {
      await this.resetTable();
    } else {
      this.filterTable();
    }
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

  @Output() resetPaginationEmitter = new EventEmitter<boolean>();

  resetEditFormAndUpdateTable(): void {
    this.isEditForm = false;
    this.resetTable();
    this.resetPaginationEmitter.emit(true);
  }

  public isModalFormProductActive = false;

  showModalFormToEditProduct(productData: IProduct): void {
    this.productData = productData;
    this.isModalFormProductActive = true;
  }

  closeModalFormCompany(): void {
    this.isModalFormCompanyActive = false;
  }

  closeModalFormProduct(): void {
    this.isModalFormCompanyActive = false;
  }

  /**
   * closeModal
   * Função que fecha o modal info.
   * @param isFalse
   */
  closeModalInfo(isFalse: boolean): void {
    this.isModalInfoActive = isFalse;
  }
  /**
   * cancelModalConfirmation
   * Método de fechar o modal confirmation
   * @param isFalse boolean false que vem do componente modal
   */
  closeModalAsk(isFalse: boolean): void {
    this.isModalAskActive = isFalse;
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
        this.closeModalAsk(false);
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
          break;
        }
        case 'suppliers': {
          const suppliersData =
            await this.registerApi.getRegisterCompanyList('suppliers');
          this.companiesData.data = suppliersData.data;
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
          const customersData = await this.registerApi.addNewCustomer(
            this.companyData,
            'customers'
          );
          this.handleSuccessModal(customersData.message);
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.addNewCustomer(
            this.companyData,
            'customers'
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.addNewCustomer(
            this.companyData,
            'supplier-products'
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcData = await this.registerApi.addNewCustomer(
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
