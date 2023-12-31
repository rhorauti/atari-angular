import { IAuthRespository } from "@src/core/repositories/IAuthRepository";
import { inject, injectable } from "tsyringe";
import { Request, Response } from 'express'
import { httpResponse } from "@src/core/httpResponses/httpResponses";

@injectable()
export class AuthController {

  constructor(
    @inject('AuthRepository') private authRepository: IAuthRespository
  ) {}

  async loginUser(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userExists = await this.authRepository.findUserByEmailAndPassword(email);
    if(!userExists) {
      return httpResponse(response, 401, 'E-mail inexistente ou incorreto!');
    } else {
      if(userExists.email == email && userExists.password != password) {
        return httpResponse(response, 401, 'Senha inválida!')
      } else {
        return httpResponse(response, 200, 'Login efetuado com sucesso!', userExists)
      }
    }
  }
}
