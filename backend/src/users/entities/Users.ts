import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;
}
