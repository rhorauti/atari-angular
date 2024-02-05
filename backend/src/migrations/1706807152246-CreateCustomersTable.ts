import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCustomersTable1706807152246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Customers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'cadastro',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'nome',
            type: 'string',
          },
          {
            name: 'email',
            type: 'string',
          },
          {
            name: 'telefone',
            type: 'string',
          },
          {
            name: 'isCnpj',
            type: 'boolean',
          },
          {
            name: 'cnpj',
            type: 'string',
          },
          {
            name: 'logradouro',
            type: 'string',
          },
          {
            name: 'numero',
            type: 'int',
          },
          {
            name: 'complemento',
            type: 'string',
          },
          {
            name: 'bairro',
            type: 'string',
          },
          {
            name: 'cidade',
            type: 'string',
          },
          {
            name: 'estado',
            type: 'string',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Customers')
  }
}
