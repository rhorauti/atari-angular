import jwtConfig from '@src/config/jwt.config'
import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { instanceToInstance } from 'class-transformer'
import { AuthRepository } from '@src/core/repositories/auth.repository'

@injectable()
export class LoginController {
  constructor(
    @inject('AuthRepository') private authRepository: AuthRepository,
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
        const token = sign({ userId: user.id }, jwtConfig.jwt.secret, {
          expiresIn: jwtConfig.jwt.expiresIn,
        })
        return response.json(
          instanceToInstance({
            status: true,
            message: 'login efetuado com sucesso!',
            data: {
              user,
              token,
            },
          }),
        )
      }
    }
  }
}
