import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Customers')
export class Customers {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 25 })
  cadastro: string

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
