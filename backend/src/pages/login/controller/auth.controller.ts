import { IAuthRespository } from "@src/core/repositories/IAuthRepository";
import { inject, injectable } from "tsyringe";
import { Request, Response } from 'express'

@injectable()
export class AuthController {

  constructor(
    @inject('AuthRepository') private authRepository: IAuthRespository
  ) {}

  async loginUser(request: Request, response: Response): Promise<Response | null> {
    const user = await this.authRepository.findUserByEmailAndPassword(request.body.email);
    if(!user) {
      return response.status(401).json({
        message: 'email inválido'
      })
    } else {
      if(user.email == request.body.email && user.password != request.body.password) {
        return response.status(401).json({
          message: 'senha inválido'
        })
      } else {
        return response.status(200).json({
          message: 'login efetuado com sucesso!',
          data: user
        })
      }
    }
  }
}
