import { AuthController } from '@src/pages/login/controller/auth.controller';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { container } from 'tsyringe';

const router = Router();
const authController = container.resolve(AuthController);

router.post('/login', celebrate({
  [Segments.BODY]: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().required(),
  }
  }),
  (request, response) => {
    return authController.loginUser(request, response);
  }
);

export { router }
