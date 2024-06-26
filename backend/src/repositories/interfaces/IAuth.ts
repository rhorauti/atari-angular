import { Users } from '@src/entities/users';

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ISignUpDTO {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  accessLevel: number;
  isActive: boolean;
  emailConfirmed: boolean;
}

export interface IAuthRepository {
  createNewUser(name: string, email: string, password: string): Promise<Users>;
  findUserByEmail(email: string): Promise<Users>;
  validateEmail(email: string): Promise<Users>;
}
