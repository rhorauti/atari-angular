import { Repository } from 'typeorm'
import { Users } from '../entities/users'
import { dataSource } from '../migrations'
import { IAuthRespository, IRequestLogin } from './IAuthRepository'

export class AuthRepository implements IAuthRespository {
  private repository: Repository<Users>

  constructor() {
    this.repository = dataSource.getRepository(Users)
  }

  async createUser({ email, password }: IRequestLogin): Promise<Users> {
    const user = this.repository.create({
      email,
      password,
    })
    return this.repository.save(user)
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOneBy({
      email: email,
    })
    return user
  }
}
