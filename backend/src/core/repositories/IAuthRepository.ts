import { Users } from '../entities/users'

export type IRequestLogin = {
  email: string
  password: string
}

export type IResponseLogin = {
  email: string
  token: string
}

export interface IAuthRespository {
  createUser({ email, password }: IRequestLogin): Promise<Users>
  findUserByEmail(email: string): Promise<Users>
}
