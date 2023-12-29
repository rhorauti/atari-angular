import { DataSource } from 'typeorm';
import { CreateUsersTable1703816465329 } from './1703816465329-CreateUsersTable';
import { User } from '@src/users/entities/Users';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [ User ],
  migrations: [ CreateUsersTable1703816465329 ],
})
