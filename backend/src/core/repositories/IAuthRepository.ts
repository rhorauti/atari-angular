import { Users } from "../entities/users";

export type usersDTO = {
  id: number;
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
}

export interface IAuthRespository {
  createUser({ name, email, password, avatar, createdAt }: usersDTO): Promise<Users>;
  findUserByEmailAndPassword( email: string ): Promise<Users>;
}

