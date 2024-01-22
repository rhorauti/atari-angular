import { container } from 'tsyringe'
import { UserRepository } from '../repositories/auth.repository'
import { AuthController } from '@src/controllers/auth/auth'
import { EmailSender } from '../email/email'
import JwtHandler from '@src/repositories/jwtService'

container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('LoginController', AuthController)
container.registerSingleton('EmailSender', EmailSender)
container.registerSingleton('JwtHandler', JwtHandler)
