import { container } from 'tsyringe'
import { AuthRepository } from '../repositories/auth.repository'
import { LoginController } from '@src/pages/login/login.controller'
import { SignUpController } from '@src/pages/signup/signup.controller'
import { EmailSender } from '../email/email'

container.registerSingleton('AuthRepository', AuthRepository)
container.registerSingleton('LoginController', LoginController)
container.registerSingleton('SignUpController', SignUpController)
container.registerSingleton('EmailSender', EmailSender)
