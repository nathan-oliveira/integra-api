import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { MeasureTypeEnum } from 'src/modules/measures/enums';

export class Measures1724853617604 implements MigrationInterface {
  private table = new Table({
    name: 'measures',
    columns: [
      {
        name: 'measure_uuid',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'measure_datetime',
        type: 'timestamp',
        isNullable: false,
      },
      {
        name: 'measure_type',
        type: 'enum',
        enum: Object.values(MeasureTypeEnum),
        isNullable: false,
      },
      {
        name: 'measure_value',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'customer_code',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'image_url',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'has_confirmed',
        type: 'int',
        default: 0,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
