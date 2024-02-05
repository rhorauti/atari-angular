import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject, signal } from '@angular/core';
import { ButtonStandardComponent } from '../../../components/button/button-standard/button-standard.component';
import { InputLoginComponent } from '../../../components/input/input-login/input-login.component';
import { ModalInfoComponent } from '../../../components/modal/modal-info/modal-info.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { InputValidationComponent } from '../../../components/input-validation/input-validation.component';
import { AuthApi } from '../../../core/api/http/auth.api';
import { HttpRequestService } from '../../../core/api/http-request.service';
import {
  IFormValidationNewPassword,
  IRequestNewPassword,
} from '../../../core/api/interfaces/IAuth';
import { IModalInfo } from '../../../core/api/interfaces/IModal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
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
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public newPassword: IRequestNewPassword = {
    token: '',
    password: signal(''),
    confirmPassword: signal(''),
  };

  public formValidation: IFormValidationNewPassword = {
    passwordLettersValidation: signal(false),
    passwordUpperCaseValidation: signal(false),
    passwordNumberValidation: signal(false),
    passwordSymbolValidation: signal(false),
    confirmPasswordValidation: signal(false),
  };

  public modalInfo: IModalInfo = {
    modalIcon: '',
    modalTitle: '',
    modalDescription: '',
    modalBtnCloseLabel: '',
    iconModalBackgroundColor: '',
    iconModalTextColor: '',
  };

  public showPassword = false;
  public isModalActive = false;
  public isLoadingActive = false;

  /**
   * getPasswordValue
   * Função que pega o valor do componente input senha
   * @param passwordValue
   */
  getPasswordValue(passwordValue: string): void {
    this.newPassword.password.set(passwordValue);
  }

  /**
   * getPasswordLettersValidation
   * Função que valida se a senha possui a quantidade minima de carateres estipulados.
   * @param validationStatus
   */
  getPasswordLettersValidation(validationStatus: boolean): void {
    this.formValidation.passwordLettersValidation.set(validationStatus);
  }

  /**
   * getPasswordUpperCaseValidation
   * Função que valida se a senha possui a quantidade minima de letras maiusculas estipulados.
   * @param validationStatus
   */
  getPasswordUpperCaseValidation(validationStatus: boolean): void {
    this.formValidation.passwordUpperCaseValidation.set(validationStatus);
  }

  /**
   * getPasswordNumberValidation
   * Função que valida se a senha possui a quantidade minima de números estipulados.
   * @param validationStatus
   */
  getPasswordNumberValidation(validationStatus: boolean): void {
    this.formValidation.passwordNumberValidation.set(validationStatus);
  }

  /**
   * getPasswordSymbolValidation
   * Função que valida se a senha possui a quantidade minima de simbolos estipulados.
   * @param validationStatus
   */
  getPasswordSymbolValidation(validationStatus: boolean): void {
    this.formValidation.passwordSymbolValidation.set(validationStatus);
  }

  /**
   * changePasswordBorderColor
   * Função computed que altera a cor da borda do input senha para vermelho caso as validações sejam atendidas.
   */
  changePasswordBorderColor: Signal<string> = computed(() => {
    if (!this.newPassword.password()) {
      return 'ring-logo-blue-hover';
    } else if (
      (this.newPassword.password() &&
        !this.formValidation.passwordLettersValidation()) ||
      !this.formValidation.passwordUpperCaseValidation() ||
      !this.formValidation.passwordNumberValidation() ||
      !this.formValidation.passwordSymbolValidation()
    ) {
      return 'ring-red-400';
    } else {
      return 'ring-logo-blue-hover';
    }
  });

  /**
   * getConfirmPasswordValue
   * Função que pega o valor do componente input do confirmar senha
   * @param passwordValue
   */
  getConfirmPasswordValue(passwordValue: string): void {
    this.newPassword.confirmPassword.set(passwordValue);
  }

  /**
   * getConfirmPasswordValidation
   * Função que valida se o confirmar senha está igual a senha.
   * @param validationStatus
   */
  getConfirmPasswordValidation(validationStatus: boolean): void {
    this.formValidation.confirmPasswordValidation.set(validationStatus);
  }

  /**
   * changeConfirmPasswordBorderColor
   * Função computed que altera a cor da borda do input confirmar senha para vermelho caso as validações sejam atendidas.
   */
  changeConfirmPasswordBorderColor: Signal<string> = computed(() => {
    if (
      this.newPassword.confirmPassword().length > 0 &&
      !this.formValidation.confirmPasswordValidation()
    ) {
      return 'ring-red-400';
    } else {
      return 'ring-logo-blue-hover';
    }
  });

  /**
   * allValidationsOk
   * Função computed que verifica se todas as validações estão atendidas ou não para destravar o botão criar novo usuário.
   */
  allValidationsOk: Signal<boolean> = computed(() => {
    if (
      this.formValidation.passwordLettersValidation() &&
      this.formValidation.passwordUpperCaseValidation() &&
      this.formValidation.passwordNumberValidation() &&
      this.formValidation.passwordSymbolValidation() &&
      this.formValidation.confirmPasswordValidation()
    ) {
      return true;
    } else {
      return false;
    }
  });

  /**
   * handleSuccessModal
   * Função que popula os dados do modal no caso de sucesso ao criar o usuário.
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
   * Função que popula os dados do modal no caso de falha ao criar o usuário.
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

  public activeRedirectPage = false;

  /**
   * authenticateUser
   * Função que submete os dados para o backend para criação do novo usuário.
   */
  async createNewPassword(): Promise<void> {
    this.isLoadingActive = true;
    try {
      const token =
        this.activatedRoute.snapshot.queryParamMap.get('token') || '';
      const response = await this.authApi.createNewPassword({
        token: token,
        password: this.newPassword.password(),
        confirmPassword: this.newPassword.confirmPassword(),
      });
      if (response) {
        this.handleSuccessModal(response.message);
        this.isModalActive = true;
        this.activeRedirectPage = true;
      }
    } catch (e: any) {
      this.handleFailureModal(e.error.message);
      this.isModalActive = true;
    } finally {
      this.isLoadingActive = false;
    }
  }

  /**
   * closeModal
   * Função que fecha o modal e direciona o usuário para a tela de login.
   * @param modalStatus
   */
  closeModal(modalStatus: boolean): void {
    this.isModalActive = modalStatus;
    if (this.activeRedirectPage) {
      return this.redirectToLoginPage();
    } else {
      return;
    }
  }

  /**
   * redirectToLoginPage
   * Função que redireciona o usuário para a tela de login.
   */
  redirectToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
