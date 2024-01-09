import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('Users')
export class Users {
  @PrimaryColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar?: string

  @CreateDateColumn()
  @Exclude()
  createdAt: Date
}
