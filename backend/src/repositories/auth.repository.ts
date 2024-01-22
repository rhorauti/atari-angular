import { Repository } from 'typeorm'
import { Users } from '../entities/users'
import { dataSource } from '../migrations'

export class UserRepository {
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
      emailConfirmed: false,
    })
    return this.repository.save(newUser)
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOneBy({
      email: email,
    })
    return user
  }

  async validateEmail(email: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Users)
      .set({ emailConfirmed: true })
      .where({ email: email })
      .execute()
  }
}
