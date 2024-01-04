import { IAuthRespository } from '@src/core/repositories/IAuthRepository'
import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'

@injectable()
export class AuthController {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRespository,
  ) {}

  async loginUser(
    request: Request,
    response: Response,
  ): Promise<Response | null> {
    const user = await this.authRepository.findUserByEmail(request.body.email)
    if (!user) {
      return response.status(401).json({
        status: false,
        message: 'email inválido',
      })
    } else {
      if (
        user.email == request.body.email &&
        user.password != request.body.password
      ) {
        return response.status(401).json({
          status: false,
          message: 'senha inválida',
        })
      } else {
        return response.json({
          status: true,
          message: 'login efetuado com sucesso!',
          data: user,
        })
      }
    }
  }
}
