import nodemailer from 'nodemailer'
import { Users } from '../entities/users'
import jwt from 'jsonwebtoken'

export class EmailSender {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  async sendEmailConfirmation(user: Users): Promise<void> {
    const token: string = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      { algorithm: 'HS256', expiresIn: '72h' },
    )
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Atari - Confirme seu cadastro!',
        html: `<h2>Olá ${user.name}!</h2>
        <p>Para confirmar seu cadastro na Atari, clique no link abaixo:</p><br>
        <h3><p><a href="${process.env.URL_FRONT}/redirect?token=${token}" target="_blank">Confirmar cadastro</a></p></h3><br>
        <p>Se você não solicitou este e-mail, por favor, ignore-o. Caso contrário, prossiga com a confirmação do seu e-mail</p>
        <p>Atenciosamente,</p>
        <p>A Equipe Atari</p>
        `,
        text: `Olá ${user.name}, Para confirmar seu cadastro, clique no link abaixo:`,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
