import { DataSource } from 'typeorm'
import { CreateUsersTable1703816465329 } from './1703816465329-CreateUsersTable'
import { Users } from '../entities/users'
import { Customers } from '@src/entities/customers'
import { CreateCustomersTable1706807152246 } from './1706807152246-CreateCustomersTable'

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Rkazuo4474!',
  database: 'atari',
  entities: [Users, Customers],
  migrations: [
    CreateUsersTable1703816465329,
    CreateCustomersTable1706807152246,
  ],
})
