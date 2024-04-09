import { container } from 'tsyringe'
import { UserRepository } from '../repositories/auth.repository'
import { AuthController } from '@src/controllers/auth.controller'
import { EmailSender } from '../email/email'
import JwtHandler from '@src/services/jwtService'
import { CustomerController } from '@src/controllers/customer.controller'
import { CustomerRepository } from '@src/repositories/customer.repository'
import { SupplierRepository } from '@src/repositories/supplier.respository'
import { SupplierController } from '@src/controllers/supplier.controller'
import { MyCompanyController } from '@src/controllers/myCompany.controller'
import { MyCompanyRepository } from '@src/repositories/myCompany.repository'

container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('LoginController', AuthController)
container.registerSingleton('EmailSender', EmailSender)
container.registerSingleton('JwtHandler', JwtHandler)
container.registerSingleton('CustomerController', CustomerController)
container.registerSingleton('CustomerRepository', CustomerRepository)
container.registerSingleton('SupplierRepository', SupplierRepository)
container.registerSingleton('SupplierController', SupplierController)
container.registerSingleton('MyCompanyRepository', MyCompanyRepository)
container.registerSingleton('MyCompanyController', MyCompanyController)
