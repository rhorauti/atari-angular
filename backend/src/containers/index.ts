import { container } from 'tsyringe'
import { UserRepository } from '../repositories/auth.repository'
import { AuthController } from '@src/controllers/auth.controller'
import { EmailSender } from '../email/email'
import JwtHandler from '@src/services/jwtService'
import { RegisterController } from '@src/controllers/customer.controller'
import { RegisterRepository } from '@src/repositories/customer.repository'

container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('LoginController', AuthController)
container.registerSingleton('EmailSender', EmailSender)
container.registerSingleton('JwtHandler', JwtHandler)
container.registerSingleton('RegisterController', RegisterController)
container.registerSingleton('RegisterRepository', RegisterRepository)
