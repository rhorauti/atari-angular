import { Component, inject } from '@angular/core';
import { AuthApi } from '../../core/api/app/auth.api';
import { IRequestlogin } from '../../core/api/interfaces/ILogin';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../core/api/http-request.service';
import { InputLoginComponent } from '../../components/input/input-login/input-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, HttpClientModule, InputLoginComponent],
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

  public emailValue = '';
  public passwordValue = '';
  public showPassword = false;

  loginUser() {
    this.authApi.authenticateUser(this.loginData);
  }

}
