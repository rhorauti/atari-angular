import { DataSource } from 'typeorm';
import { CreateUsersTable1703816465329 } from './1703816465329-CreateUsersTable';
import { Users } from '../entities/users';
import { Customers } from '@src/entities/customers';
import { CreateCustomersTable1706807152246 } from './1706807152246-CreateCustomersTable';
import { Suppliers } from '@src/entities/suppliers';
import { CreateSuppliersTable1709643196428 } from './1709643196428-CreateSuppliersTable';
import { MyCompany } from '@src/entities/myCompany';
import { Company } from '@src/entities/company';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Rkazuo4474!',
  database: 'atari',
  entities: [Users, Customers, Suppliers, MyCompany, Company],
  migrations: [
    CreateUsersTable1703816465329,
    CreateCustomersTable1706807152246,
    CreateSuppliersTable1709643196428,
  ],
});
