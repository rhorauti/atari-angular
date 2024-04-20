import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { UserRepository } from '@src/repositories/auth.repository';
import { compare, hash } from 'bcryptjs';
import JwtHandler from '@src/services/jwtService';
import { EmailSender } from '@src/email/email';

@injectable()
export class AuthController {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('EmailSender') private emailSender: EmailSender,
  ) {}

  /**
   * loginUser
   * Verifica se o e-mail recebido é valido para realizar o login
   * @param request dados recebidos do frontend
   * @param response dados que serão enviados para o frontend
   * @returns Resposta com o status, mensagem e dados do usuário e token
   */
  async loginUser(
    request: Request,
    response: Response,
  ): Promise<Response | null> {
    const user = await this.userRepository.findUserByEmail(request.body.email);
    if (!user) {
      return response.status(401).json({
        status: false,
        message: 'email inválido',
      });
    } else if (user && !user.emailConfirmed) {
      this.emailSender.sendEmailConfirmationSignUp(user);
      return response.status(401).json({
        status: false,
        message:
          'Email não validado. Enviamos novamente um e-mail para validação.',
      });
    } else {
      const passwordConfirmed = await compare(
        request.body.password,
        user.password,
      );
      if (!passwordConfirmed) {
        return response.status(401).json({
          status: false,
          message: 'Senha inválida!',
        });
      } else {
        const token = JwtHandler.signToken(
          { id: user.id, email: user.email },
          { expiresIn: process.env.JWT_EXPIRES_IN },
        );
        return response.json(
          instanceToInstance({
            status: true,
            message: 'login efetuado com sucesso!',
            data: {
              user,
              token,
            },
          }),
        );
      }
    }
  }

  /**
   * createNewUser
   * Cria um novo usuário no banco de dados.
   * @param request dados recebidos do frontend
   * @param response dados que serão enviados para o frontend
   * @returns Resposta com o status, mensagem e dados do usuário.
   */
  async createNewUser(
    request: Request,
    response: Response,
  ): Promise<Response | null> {
    const userExists = await this.userRepository.findUserByEmail(
      request.body.email,
    );
    if (userExists) {
      return response.status(401).json({
        status: false,
        message: 'email já cadastrado!',
      });
    } else {
      const hashedPassword = await hash(request.body.password, 10);
      const newUser = await this.userRepository.createNewUser(
        request.body.name,
        request.body.email,
        hashedPassword,
      );
      if (!newUser) {
        return response.status(500).json({
          status: false,
          message: 'Erro interno do servidor!',
        });
      } else {
        this.emailSender.sendEmailConfirmationSignUp(newUser);
        return response.status(200).json({
          status: true,
          message: 'Usuário cadastrado com sucesso!',
          data: {
            newUser,
          },
        });
      }
    }
  }

  /**
   * confirmUserValidation
   * Verifica se o o e-mail do usuário foi validado ou não
   * @param request dados recebidos do frontend
   * @param response dados que serão enviados para o frontend
   * @returns Promise com o status, mensagem e dados do usuário.
   */
  async confirmUserValidation(
    request: Request,
    response: Response,
  ): Promise<void> {
    const token = request.query.token as string;
    JwtHandler.verifyToken(token, async (error: any, decodedUser: any) => {
      if (error) {
        return response.status(401).json({
          status: false,
          message: 'Token inválido ou expirado.',
        });
      } else {
        const decodedEmail = decodedUser.email;
        const user = this.userRepository.findUserByEmail(decodedEmail);
        if ((await user).emailConfirmed) {
          return response.status(401).json({
            status: false,
            message: 'Usuário já validado anteriormente.',
          });
        } else {
          this.userRepository.validateEmail(decodedEmail);
          return response.status(200).json({
            status: true,
            message: 'Usuário validado com sucesso.',
          });
        }
      }
    });
  }

  async getNewEmailValidation(
    request: Request,
    response: Response,
  ): Promise<Response | null> {
    const user = await this.userRepository.findUserByEmail(request.body.email);
    if (!user) {
      return response.status(401).json({
        status: false,
        message: 'Email não existe.',
      });
    } else {
      this.emailSender.sendEmailConfirmationResetPassword(user);
      return response.status(200).json({
        status: true,
        message: 'E-mail enviado para validação.',
      });
    }
  }

  async resetPassword(request: Request, response: Response): Promise<void> {
    const token = request.query.token as string;
    JwtHandler.verifyToken(token, async (error: any, decodedUser: any) => {
      if (error) {
        return response.status(401).json({
          status: false,
          message: 'Token inválido ou expirado.',
        });
      } else {
        const decodedEmail = decodedUser.email;
        const user = this.userRepository.findUserByEmail(decodedEmail);
        const isSamePassword = await compare(
          request.body.password,
          (await user).password,
        );
        if (isSamePassword) {
          return response.status(401).json({
            status: false,
            message: 'A senha digitada é igual a senha atual.',
          });
        } else {
          const hashedPassword = await hash(request.body.password, 10);
          this.userRepository.changePassword(decodedEmail, hashedPassword);
          return response.status(200).json({
            status: true,
            message: 'Senha alterada com sucesso.',
          });
        }
      }
    });
  }
}
