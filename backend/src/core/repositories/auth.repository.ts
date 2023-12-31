import { Repository } from "typeorm";
import { Users } from "../entities/users";
import { dataSource } from "../migrations";
import { IAuthRespository, usersDTO } from "./IAuthRepository";

export class AuthRepository implements IAuthRespository {

  private repository: Repository<Users>;

  constructor() {
    this.repository = dataSource.getRepository(Users);
  }

  async createUser({ name, email, password, avatar, createdAt }: usersDTO): Promise<Users> {
    const user = this.repository.create({ name, email, password, avatar, createdAt });
    return this.repository.save(user);
  }

  async findUserByEmailAndPassword(email: string): Promise<Users> {
    const user = await this.repository.findOneBy({
        email: email,
    })
    return user;
  }
}


