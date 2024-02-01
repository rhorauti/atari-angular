import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
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

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    InputSearchComponent,
    ButtonStandardComponent,
    HttpClientModule,
  ],
  providers: [RegisterCompanyApi, HttpRequestService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  private registerApi = inject(RegisterCompanyApi);
  @Input() registerType = '';
  public companiesOrProductsData: IResponseCompany | IResponseProduct = {
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
    isCnpj: false,
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
      switch (this.registerType) {
        case 'customers': {
          const customersData =
            await this.registerApi.getRegistersList('customers');
          this.companiesOrProductsData.data = customersData.data;
          this.handleSuccessModal(customersData.message);
          break;
        }
        case 'suppliers': {
          const suppliersData =
            await this.registerApi.getRegistersList('suppliers');
          this.companiesOrProductsData.data = suppliersData.data;
          this.handleSuccessModal(suppliersData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcsData =
            await this.registerApi.getRegistersList('supplier-products');
          this.companiesOrProductsData.data = supplierProdutcsData.data;
          this.handleSuccessModal(supplierProdutcsData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcsData =
            await this.registerApi.getRegistersList('customer-products');
          this.companiesOrProductsData.data = customerProdutcsData.data;
          this.handleSuccessModal(customerProdutcsData.message);
          break;
        }
        default:
          'customers';
      }
    } catch (e: any) {
      this.handleSuccessModal(e.error.message);
    }
  }

  async addNew() {
    try {
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
    }
  }

  async update() {
    try {
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
            'customers',
            this.companyData.id
          );
          this.handleSuccessModal(supplierData.message);
          break;
        }
        case 'supplier-products': {
          const supplierProdutcData = await this.registerApi.updateRegister(
            this.productData,
            'customers',
            this.productData.id
          );
          this.handleSuccessModal(supplierProdutcData.message);
          break;
        }
        case 'customer-products': {
          const customerProdutcData = await this.registerApi.updateRegister(
            this.productData,
            'customers',
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
    }
  }
}
