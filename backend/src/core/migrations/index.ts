import { DataSource } from 'typeorm'
import { CreateUsersTable1703816465329 } from './1703816465329-CreateUsersTable'
import { Users } from '../entities/users'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Users],
  migrations: [CreateUsersTable1703816465329],
})
