import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonStandardComponent } from '../../../components/button/button-standard/button-standard.component';
import { InputLoginComponent } from '../../../components/input/input-login/input-login.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalInfoComponent } from '../../../components/modal-info/modal-info.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthApi } from '../../../core/api/http/auth.api';
import { HttpRequestService } from '../../../core/api/http-request.service';
import { Router } from '@angular/router';
import { IModalInfo } from '../../../core/api/interfaces/IModal';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonStandardComponent,
    InputLoginComponent,
    MatIconModule,
    ModalInfoComponent,
    LoadingComponent,
  ],
  providers: [AuthApi, HttpRequestService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private authApi = inject(AuthApi);
  private router = inject(Router);

  email: string = '';

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
    this.email = emailValue;
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
  async getEmailValidation(): Promise<void> {
    this.isLoadingActive = true;
    try {
      if (this.email.length == 0) {
        this.handleFailureModal('Campo email vazio!');
      } else {
        const response = await this.authApi.getEmailValidation(this.email);
        if (response) {
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
   * redirectToNewUser
   * Função que redireciona o usuário para a tela de cadastro.
   */
  redirectToNewUserPage(): void {
    this.router.navigate(['/signup']);
  }

  /**
   * redirectToLoginPage
   * Função que redireciona o usuário para a tela de login.
   */
  redirectToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
