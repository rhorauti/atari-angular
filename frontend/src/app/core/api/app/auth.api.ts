import { Injectable, inject } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IRequestlogin, IResponseLogin } from '../interfaces/ILogin';
// import { IResponseCheckValidToken } from '../interfaces/IRedirect';

export class AuthApi {

  private httpRequestService = inject(HttpRequestService);

  // constructor(private httpRequestService: HttpRequestService) {}

  /**
   * authenticateUser
   * POST que será usada no componente login.
   * @param login dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status e a data e horário de retorno da resposta.
   */
  async authenticateUser(login: IRequestlogin): Promise<IResponseLogin> {
    const response = await this.httpRequestService.sendHttpRequest(
      `http://localhost:3000/login`,
      'POST',
      login,
    );
    // localStorage.setItem('@authToken', response.data);
    return response;
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
