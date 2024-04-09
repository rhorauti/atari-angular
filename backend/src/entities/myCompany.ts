import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

@Entity('MyCompany')
export class MyCompany {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp' })
  cadastro: Timestamp

  @Column({ type: 'varchar', length: 100 })
  nome: string

  @Column({ type: 'varchar', length: 100 })
  email: string

  @Column({ type: 'varchar', length: 20 })
  telefone: string

  @Column({ type: 'boolean' })
  isCnpj: boolean

  @Column({ type: 'varchar', length: 20 })
  cnpj: string

  @Column({ type: 'varchar', length: 150 })
  logradouro: string

  @Column({ type: 'int' })
  numero: number

  @Column({ type: 'varchar', length: 100 })
  complemento: string

  @Column({ type: 'varchar', length: 50 })
  bairro: string

  @Column({ type: 'varchar', length: 50 })
  cidade: string

  @Column({ type: 'varchar', length: 2 })
  estado: string
}
