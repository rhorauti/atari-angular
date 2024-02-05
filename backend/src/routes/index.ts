import { AuthController } from '@src/controllers/auth.controller'
import { RegisterController } from '@src/controllers/customer.controller'
import { Router } from 'express'
import { container } from 'tsyringe'

const router = Router()
const authController = container.resolve(AuthController)
const registerController = container.resolve(RegisterController)

router.post('/login', (request, response) => {
  authController.loginUser(request, response)
})

router.post('/signup', (request, response) => {
  authController.createNewUser(request, response)
})

router.get('/email-validation', (request, response) => {
  authController.confirmUserValidation(request, response)
})

router.post('/reset-password', (request, response) => {
  authController.getNewEmailValidation(request, response)
})

router.post('/new-password', (request, response) => {
  authController.resetPassword(request, response)
})

router.post('/customers', (request, response) => {
  registerController.addNewCustomer(request, response, 'customers')
})

router.get('/customers', (request, response) => {
  registerController.getCustomersList(response)
})

export { router }
