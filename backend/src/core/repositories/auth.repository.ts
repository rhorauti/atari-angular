import { Repository } from 'typeorm'
import { Users } from '../entities/users'
import { dataSource } from '../migrations'

export class AuthRepository {
  private repository: Repository<Users>

  constructor() {
    this.repository = dataSource.getRepository(Users)
  }

  async createNewUser(
    name: string,
    email: string,
    password: string,
  ): Promise<Users> {
    const newUser = this.repository.create({
      name: name,
      email: email,
      password: password,
      createdAt: new Date(),
      accessLevel: 1,
      isActive: true,
    })
    return this.repository.save(newUser)
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOneBy({
      email: email,
    })
    return user
  }
}
