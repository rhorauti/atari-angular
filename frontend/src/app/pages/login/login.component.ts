import { Component, inject } from '@angular/core';
import { AuthApi } from '../../core/api/app/auth.api';
import { IModalInfo, IRequestlogin } from '../../core/api/interfaces/ILogin';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../core/api/http-request.service';
import { InputLoginComponent } from '../../components/input/input-login/input-login.component';
import { ButtonStandardComponent } from '../../components/button/button-standard/button-standard.component';
import { ModalInfoComponent } from '../../components/modal-info/modal-info.component';
import { LoadingComponent } from '../../components/loading/loading.component';

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
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authApi = inject(AuthApi);

  loginData: IRequestlogin = {
    email: '',
    password: '',
    rememberMe: false,
  }

  public showPassword = false;
  public isModalActive = false;
  public isLoadingActive = false;
  public modalInfo: IModalInfo = {
    modalIcon: '',
    modalTitle: '',
    modalDescription: '',
    iconModalBackgroundColor: '',
    iconModalTextColor: '',
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
   * getEmailValue
   * Função que pega o valor do componente input e-mail
   * @param emailValue
   */
  getEmailValue(emailValue: string): void {
    this.loginData.email = emailValue;
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
      iconModalBackgroundColor: 'bg-green-600',
      iconModalTextColor: 'text-green-100',
    }
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
      iconModalBackgroundColor: 'bg-red-500',
      iconModalTextColor: 'text-white',
    }
  }

  /**
   * authenticateUser
   * Função que envia os dados do usuário (email e senha) para validação do backend
   */
  async submitUserData(): Promise<void> {
    this.isLoadingActive = true;
    try {
      if(this.loginData.email.length == 0) {
        this.handleFailureModal("O campo de e-mail está vazio! Digite um e-mail válido!");
      } else if(this.loginData.password.length == 0) {
        this.handleFailureModal("O campo de senha está vazio! Digite uma senha válida!");
      }
      const response = await this.authApi.authenticateUser(this.loginData);
      if(response.status) {
        console.log('sucesso!')
        this.handleSuccessModal(response.message);
      }
      this.isModalActive = true;
    } catch (error: any) {
      console.log(error)
      // this.handleFailureModal(message)
      // this.isModalActive = true;
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

}
