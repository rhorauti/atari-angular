import { inject } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import {
  IRequestNewPasswordHttp,
  IRequestSignUpHttp,
  IRequestlogin,
  IResponseCheckValidToken,
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

  /**
   * checkValidToken
   * Função que verifica se o token está valido ou não.
   * @returns retorna a mensagem e o status 200(sucesso) ou 401(falha) dependendo se o token estiver válido.
   */
  async checkValidToken(
    token: string | null
  ): Promise<IResponseCheckValidToken> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.API}/email-validation?token=${token}`,
      'GET'
    );
  }

  /**
   * createNewUser
   * Função que cria um usuário no banco de dados.
   * @param newUser nome, email, senha do novo usuário
   * @returns id, email, avatar, data de criação do usuário junto com a mensagem que será exibida no modal.
   */
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
