import { AuthController } from '@src/pages/login/controller/auth.controller'
import { Router } from 'express'
import { container } from 'tsyringe'

const router = Router()
const authController = container.resolve(AuthController)

router.post('/login', (request, response) => {
  authController.loginUser(request, response)
})

export { router }
