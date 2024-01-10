import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonStandardComponent } from '../../../components/button/button-standard/button-standard.component';
import { InputLoginComponent } from '../../../components/input/input-login/input-login.component';
import { ModalInfoComponent } from '../../../components/modal-info/modal-info.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AuthApi } from '../../../core/api/http/auth.api';
import { IRequestSignUp } from '../../../core/api/interfaces/IAuth';
import { HttpRequestService } from '../../../core/api/http-request.service';
import { Router } from '@angular/router';
import { IModalInfo } from '../../../core/api/interfaces/IModal';
import { InputValidationComponent } from '../../../components/input-validation/input-validation.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ButtonStandardComponent,
    InputLoginComponent,
    ModalInfoComponent,
    LoadingComponent,
    MatIconModule,
    HttpClientModule,
    InputValidationComponent,
  ],
  providers: [AuthApi, HttpRequestService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private authApi = inject(AuthApi);
  private router = inject(Router);

  signupData: IRequestSignUp = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
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
   * getNameValue
   * Função que pega o valor do componente input nome
   * @param emailValue
   */
  getNameValue(nameValue: string): void {
    this.signupData.name = nameValue;
  }

  /**
   * getEmailValue
   * Função que pega o valor do componente input e-mail
   * @param emailValue
   */
  getEmailValue(emailValue: string): void {
    this.signupData.email = emailValue;
  }

  /**
   * getPasswordValue
   * Função que pega o valor do componente input senha
   * @param passwordValue
   */
  getPasswordValue(passwordValue: string): void {
    this.signupData.password = passwordValue;
  }

  /**
   * getConfirmPasswordValue
   * Função que pega o valor do componente input do confirmar senha
   * @param passwordValue
   */
  getConfirmPasswordValue(passwordValue: string): void {
    this.signupData.password = passwordValue;
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
   * authenticateUser
   * Função que envia os dados do usuário (email e senha) para validação do backend
   */
  async createNewUser(): Promise<void> {
    this.isLoadingActive = true;
    try {
      if (this.signupData.email.length == 0) {
        this.handleFailureModal('Campo email vazio!');
      } else if (this.signupData.password.length == 0) {
        this.handleFailureModal('Campo senha vazio!');
      } else {
        const response = await this.authApi.createNewUser(this.signupData);
        if (!response.status) {
          this.handleFailureModal(response.message);
        } else {
          this.handleSuccessModal(response.message);
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
    this.isModalActive = modalStatus;
  }

  /**
   * redirectToLoginPage
   * Função que redireciona o usuário para a tela de login.
   */
  redirectToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
