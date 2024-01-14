import { LoginController } from '@src/pages/login/login.controller'
import { SignUpController } from '@src/pages/signup/signup.controller'
import { Router } from 'express'
import { container } from 'tsyringe'

const router = Router()
const loginController = container.resolve(LoginController)
const signUpController = container.resolve(SignUpController)

router.post('/login', (request, response) => {
  loginController.loginUser(request, response)
})

router.post('/signup', (request, response) => {
  signUpController.createNewUser(request, response)
})

export { router }
