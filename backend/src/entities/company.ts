import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  tipoEmpresa: number;

  @Column({ type: 'timestamp' })
  cadastro: Timestamp;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @Column({ type: 'varchar', length: 20 })
  cnpj: string;

  @Column({ type: 'varchar', length: 150 })
  logradouro: string;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'varchar', length: 100 })
  complemento: string;

  @Column({ type: 'varchar', length: 50 })
  bairro: string;

  @Column({ type: 'varchar', length: 50 })
  cidade: string;

  @Column({ type: 'varchar', length: 2 })
  uf: string;
}
