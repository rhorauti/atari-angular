import { container } from 'tsyringe';
import { AuthRepository } from '../repositories/auth.repository';

container.registerSingleton('AuthRepository', AuthRepository);
