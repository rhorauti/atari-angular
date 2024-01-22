import { AuthController } from '@src/controllers/auth/auth'
import { Router } from 'express'
import { container } from 'tsyringe'

const router = Router()
const authController = container.resolve(AuthController)

router.post('/login', (request, response) => {
  authController.loginUser(request, response)
})

router.post('/signup', (request, response) => {
  authController.createNewUser(request, response)
})

router.get('/email-validation', (request, response) => {
  authController.confirmUserValidation(request, response)
})

export { router }
