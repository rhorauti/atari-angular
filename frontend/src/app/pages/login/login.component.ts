import { Component, inject } from '@angular/core';
import { AuthApi } from '../../core/api/app/auth.api';
import { IRequestlogin } from '../../core/api/interfaces/ILogin';
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
    isChecked: false,
  }

  public showPassword = false;
  public isModalActive = false;
  public isLoadingActive = false;
  public modalInfo = {
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
  handleSuccessModal(): void {
    this.modalInfo = {
      modalIcon: 'check',
      modalTitle: 'Sucesso!',
      modalDescription: 'Login realizado com sucesso!',
      iconModalBackgroundColor: 'bg-green-600',
      iconModalTextColor: 'text-green-100',
    }
  }

  /**
   * handleFailureModal
   * Função que popula os dados do modal no caso de email ou senha digitados incorretamente.
   */
  handleFailureModal(): void {
    this.modalInfo = {
      modalIcon: 'close',
      modalTitle: 'Erro!',
      modalDescription: 'E-mail ou senha inválidos!',
      iconModalBackgroundColor: 'bg-red-500',
      iconModalTextColor: 'bg-red-300',
    }
  }

  /**
   * authenticateUser
   * Função que envia os dados do usuário (email e senha) para validação do backend
   */
  async submitUserData(): Promise<void> {
    this.isLoadingActive = true;
    try {
      const response = await this.authApi.authenticateUser(this.loginData);
      if(response.status) {
        this.handleSuccessModal();
        this.isModalActive = true;
      }
    } catch {
      this.handleFailureModal();
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

}
