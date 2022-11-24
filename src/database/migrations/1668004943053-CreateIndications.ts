import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIndications1668004943053 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'indications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'synopsis',
            type: 'varchar',
          },
          {
            name: 'avaliation',
            type: 'numeric',
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('indications');
  }

}
