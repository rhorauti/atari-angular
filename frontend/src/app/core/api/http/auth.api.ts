import { inject } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import {
  IRequestNewPassword,
  IRequestNewPasswordHttp,
  IRequestSignUpHttp,
  IRequestlogin,
  IResponseGetEmailValidation,
  IResponseLogin,
  IResponseNewPassword,
  IResponseSignUp,
} from '../interfaces/IAuth';
import { environment } from '../../../environments/environment';
// import { IResponseCheckValidToken } from '../interfaces/IRedirect';

export class AuthApi {
  private readonly API = environment.apiUrl;

  private httpRequestService = inject(HttpRequestService);

  /**
   * authenticateUser
   * POST que será usada no componente login.
   * @param login dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status e a data e horário de retorno da resposta.
   */
  async authenticateUser(login: IRequestlogin): Promise<IResponseLogin> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${this.API}/login`,
      'POST',
      login
    );
    localStorage.setItem('@authToken', response.data.token);
    return response;
  }

  async createNewUser(newUser: IRequestSignUpHttp): Promise<IResponseSignUp> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.API}/signup`,
      'POST',
      newUser
    );
  }

  async getEmailValidation(
    email: string
  ): Promise<IResponseGetEmailValidation> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.API}/reset-password`,
      'POST',
      email
    );
  }

  async createNewPassword(
    newPassword: IRequestNewPasswordHttp
  ): Promise<IResponseNewPassword> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.API}/new-password`,
      'POST',
      newPassword
    );
  }
}
