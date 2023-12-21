import { Component, inject } from '@angular/core';
import { AuthApi } from '../../core/api/app/auth.api';
import { IRequestlogin } from '../../core/api/interfaces/ILogin';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../core/api/http-request.service';
import { InputLoginComponent } from '../../components/input/input-login/input-login.component';
import { ButtonSubmitComponent } from '../../components/button/button-submit/button-submit.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule, 
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    InputLoginComponent, 
    ButtonSubmitComponent,
    ModalComponent,
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

  public emailValue = '';
  public passwordValue = '';
  public showPassword = false;
  public isModalNotActive = true;

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
   * authenticateUser
   * Função que envia os dados do usuário (email e senha) para validação do backend
   */
  submitUserData():void {
    this.showModal();
    // this.authApi.authenticateUser(this.loginData);
  }

  showModal() {
    this.isModalNotActive = false;
  }

  closeModal(modalStatus: boolean) {
    this.isModalNotActive = modalStatus; 
  }

}
