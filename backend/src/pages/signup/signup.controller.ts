import { EmailSender } from '@src/core/email/email'
import { AuthRepository } from '@src/core/repositories/auth.repository'
import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SignUpController {
  constructor(
    @inject('AuthRepository') private authRepository: AuthRepository,
    @inject('EmailSender') private emailSender: EmailSender,
  ) {}

  async createNewUser(
    request: Request,
    response: Response,
  ): Promise<Response | null> {
    const userExists = await this.authRepository.findUserByEmail(
      request.body.email,
    )
    if (userExists) {
      return response.status(401).json({
        status: false,
        message: 'email já cadastrado!',
      })
    } else {
      const hashedPassword = await hash(request.body.password, 10)
      const newUser = await this.authRepository.createNewUser(
        request.body.name,
        request.body.email,
        hashedPassword,
      )
      if (!newUser) {
        return response.status(401).json({
          status: false,
          message: 'Erro inesperado!',
        })
      } else {
        this.emailSender.sendEmailConfirmation(newUser)
        return response.status(200).json({
          status: true,
          message: 'Usuário cadastrado com sucesso!',
          data: {
            newUser,
          },
        })
      }
    }
  }
}
