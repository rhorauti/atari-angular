import { AuthController } from '@src/controllers/auth.controller'
import { CustomerController } from '@src/controllers/customer.controller'
import { Router } from 'express'
import { container } from 'tsyringe'

const router = Router()
const authController = container.resolve(AuthController)
const customerController = container.resolve(CustomerController)

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

router.get('/customers', (request, response) => {
  customerController.getCustomersList(response)
})

router.post('/customers', (request, response) => {
  customerController.addNewCustomer(request, response)
})

router.put('/customers/:id', (request, response) => {
  customerController.updateCustomer(request, response)
})

router.delete('/customers/:id', (request, response) => {
  customerController.deleteCustomer(request, response)
})

export { router }
