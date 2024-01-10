import { inject } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import {
  IRequestSignUp,
  IRequestlogin,
  IResponseLogin,
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

  async createNewUser(newUser: IRequestSignUp): Promise<IResponseSignUp> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.API}/signup`,
      'POST',
      newUser
    );
  }

  /**
   * checkValidToken
   *
   * Função que verifica se o token está valido ou não.
   *
   * @returns retorna a mensagem e o status 200(sucesso) ou 401(falha) dependendo se o token estiver válido.
   */
  //   async checkValidToken(
  //     token: string | null,
  //   ): Promise<IResponseCheckValidToken> {
  //     return await this.httpRequestService.sendHttpRequest(
  //       `${this.apiUrl}/check?token=${token}`,
  //       'GET',
  //     );
  //   }
  /**
   * sendNewPassword
   * @param newPassword Email cadastrado que será enviado na solicitação http
   * @returns Retorna o resultado da verificação da existência do email do BD.
   */
  //   async sendNewPassword(
  //     token: string | null,
  //     newPassword: object,
  //   ): Promise<string> {
  //     const response = await this.httpRequestService.sendHttpRequest(
  //       `${this.apiUrl}/changepassword?token=${token}`,
  //       'POST',
  //       newPassword,
  //     );
  //     return response;
  //   }
  /**
   * sendPasswordResetEmail
   * @param emailValue Email cadastrado que será enviado na solicitação http
   * @returns Retorna o resultado da verificação da existência do email do BD.
   */
  //   async sendPasswordResetEmail(emailValue: string | any): Promise<string> {
  //     const response = await this.httpRequestService.sendHttpRequest(
  //       `${this.apiUrl}/recovery`,
  //       'POST',
  //       emailValue,
  //     );
  //     return response;
  //   }
}
