import { Component, ViewChild, inject } from '@angular/core';
import { AuthApi } from '../../../core/api/http/auth.api';
import { IRequestlogin } from '../../../core/api/interfaces/IAuth';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../../core/api/http-request.service';
import { InputLoginComponent } from '../../../components/input/input-login/input-login.component';
import { ButtonStandardComponent } from '../../../components/button/button-standard/button-standard.component';
import { ModalInfoComponent } from '../../../components/modal/modal-info/modal-info.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Router } from '@angular/router';
import { IModalInfo } from '../../../core/api/interfaces/IModal';
import { MenuComponent } from '../../../components/menu/menu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputLoginComponent,
    ButtonStandardComponent,
    ModalInfoComponent,
    LoadingComponent,
  ],
  providers: [AuthApi, HttpRequestService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authApi = inject(AuthApi);
  private router = inject(Router);

  @ViewChild(MenuComponent) menuComponent?: MenuComponent;

  loginData: IRequestlogin = {
    email: '',
    password: '',
    rememberMe: false,
  };

  public showPassword = false;
  public isModalActive = false;
  public isLoadingActive = false;
  public modalInfo: IModalInfo = {
    modalIcon: '',
    modalTitle: '',
    modalDescription: '',
    modalBtnCloseLabel: '',
    iconModalBackgroundColor: '',
    iconModalTextColor: '',
  };

  /**
   * getEmailValue
   * Função que pega o valor do componente input e-mail
   * @param emailValue
   */
  getEmailValue(emailValue: string): void {
    this.loginData.email = emailValue;
  }

  /**
   * getPasswordValue
   * Função que pega o valor do componente input password
   * @param passwordValue
   */
  getPasswordValue(passwordValue: string): void {
    this.loginData.password = passwordValue;
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

  public isLoginSuccess = false;

  /**
   * authenticateUser
   * Função que envia os dados do usuário (email e senha) para validação do backend
   */
  async submitUserData(): Promise<void> {
    this.isLoadingActive = true;
    try {
      if (this.loginData.email.length == 0) {
        this.handleFailureModal('Campo email vazio!');
      } else if (this.loginData.password.length == 0) {
        this.handleFailureModal('Campo senha vazio!');
      } else {
        const response = await this.authApi.authenticateUser(this.loginData);
        if (response) {
          this.handleSuccessModal(response.message);
          this.isLoginSuccess = true;
        }
      }
      this.isModalActive = true;
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
      this.isModalActive = true;
    } finally {
      this.isLoadingActive = false;
    }
  }

  /**
   * closeModal
   * Função que fecha o modal e direciona o usuário para a tela inicial da aplicação.
   * @param modalStatus
   */
  closeModal(modalStatus: boolean): void {
    if (!this.isLoginSuccess) {
      this.isModalActive = modalStatus;
    } else {
      this.isModalActive = modalStatus;
      this.router.navigate(['/welcome']);
    }
  }

  /**
   * redirectToNewUser
   * Função que redireciona o usuário para a tela de cadastro.
   */
  redirectToNewUserPage(): void {
    this.router.navigate(['/signup']);
  }

  redirectToGetEmailValidation(): void {
    this.router.navigate(['/reset-password']);
  }
}
