import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { RegisterCompanyApi } from '../../core/api/http/register.api';
import { InputSearchComponent } from '../input/input-search/input-search.component';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../core/api/http-request.service';
import {
  ICompany,
  IProduct,
  IResponseCompany,
  IResponseProduct,
} from '../../core/api/interfaces/IRegister';
import { IModalInfo } from '../../core/api/interfaces/IModal';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    InputSearchComponent,
    ButtonStandardComponent,
    HttpClientModule,
    InputSearchComponent,
    LoadingComponent,
  ],
  providers: [RegisterCompanyApi, HttpRequestService, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  private registerApi = inject(RegisterCompanyApi);
  private paginationComponent = inject(PaginationComponent);
  @Input() tableInitialIdx =
    this.paginationComponent.tableIndexInfo.tableInitialIdx;
  @Input() tableLastIdx = this.paginationComponent.tableIndexInfo.tableLastIdx;
  @Input() registerType = '';
  @Input() showLoading = false;
  @Output() tableDataEmitter = new EventEmitter<ICompany[] | IProduct[]>();
  public companyTableHeaders = [
    'Id',
    'Cadastro',
    'Nome',
    'E-mail',
    'Telefone',
    'CPF/CNPJ',
    'Logradouro',
    'Numero',
    'Complemento',
    'Bairro',
    'Cidade',
    'Estado',
    'Ação',
  ];
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

  public modalInfo: IModalInfo = {
    modalIcon: '',
    modalTitle: '',
    modalDescription: '',
    modalBtnCloseLabel: '',
    iconModalBackgroundColor: '',
    iconModalTextColor: '',
  };

  async ngOnInit() {
    await this.getList();
    switch (this.registerType) {
      case 'customers':
      case 'suppliers': {
        this.tableDataEmitter.emit(this.companiesData.data);
        break;
      }
      case 'supplier-products':
      case 'customer-products': {
        this.tableDataEmitter.emit(this.productsData.data);
        break;
      }
      default:
        'customers';
    }
  }

  /**
   * handleSuccessModal
   * Função que popula os dados do modal no caso de email ou senha validados corretamente.
   */
  handleSuccessModal(message: string): void {
    this.modalInfo = {
      modalIcon: 'check',
      modalTitle: 'Sucesso!',
      modalDescription: message,
      modalBtnCloseLabel: 'Fechar',
      iconModalBackgroundColor: 'bg-green-600',
      iconModalTextColor: 'text-green-100',
    };
  }

  /**
   * handleFailureModal
   * Função que popula os dados do modal no caso de email ou senha digitados incorretamente.
   */
  handleFailureModal(message: string): void {
    this.modalInfo = {
      modalIcon: 'close',
      modalTitle: 'Erro!',
      modalDescription: message,
      modalBtnCloseLabel: 'Fechar',
      iconModalBackgroundColor: 'bg-red-500',
      iconModalTextColor: 'text-white',
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
          this.handleSuccessModal(customersData.message);
          break;
        }
        case 'suppliers': {
          const suppliersData =
            await this.registerApi.getRegisterCompanyList('suppliers');
          this.companiesData.data = suppliersData.data;
          this.handleSuccessModal(suppliersData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcsData =
            await this.registerApi.getRegisterProductsList('supplier-products');
          this.productsData.data = supplierProdutcsData.data;
          this.handleSuccessModal(supplierProdutcsData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcsData =
            await this.registerApi.getRegisterProductsList('customer-products');
          this.productsData.data = customerProdutcsData.data;
          this.handleSuccessModal(customerProdutcsData.message);
          break;
        }
        default:
          'customers';
      }
    } catch (e: any) {
      this.handleSuccessModal(e.error.message);
    } finally {
      this.showLoading = false;
    }
  }

  async addNew() {
    try {
      this.showLoading = true;
      switch (this.registerType) {
        case 'customers': {
          const customersData = await this.registerApi.addNewRegister(
            this.companyData,
            'customers'
          );
          this.handleSuccessModal(customersData.message);
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.addNewRegister(
            this.companyData,
            'customers'
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.addNewRegister(
            this.companyData,
            'supplier-products'
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcData = await this.registerApi.addNewRegister(
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
          const customerData = await this.registerApi.updateRegister(
            this.companyData,
            'customers',
            this.companyData.id
          );
          this.handleSuccessModal(customerData.message);
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.updateRegister(
            this.companyData,
            'suppliers',
            this.companyData.id
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.updateRegister(
            this.productData,
            'supplier-products',
            this.productData.id
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcData = await this.registerApi.updateRegister(
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

  async delete(): Promise<void> {
    try {
      this.showLoading = true;
      switch (this.registerType) {
        case 'customers': {
          const customerData = await this.registerApi.deleteRegister(
            'customers',
            this.companyData.id.toString()
          );
          this.handleSuccessModal(customerData.message);
          break;
        }
        case 'suppliers': {
          const supplierData = await this.registerApi.deleteRegister(
            'suppliers',
            this.companyData.id.toString()
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.deleteRegister(
            'supplier-products',
            this.productData.id.toString()
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcsData = await this.registerApi.deleteRegister(
            'customer-products',
            this.productData.id.toString()
          );
          this.handleFailureModal(customerProdutcsData.message);
          break;
        }
        default:
          'customer';
      }
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
    } finally {
      this.showLoading = false;
    }
  }
}
