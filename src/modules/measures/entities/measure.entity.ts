import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { MeasureTypeEnum } from '../enums';

@Entity('measures')
export class MeasureEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  measure_uuid: string;

  @Column()
  measure_datetime: Date;

  @Column({ type: 'enum', enum: MeasureTypeEnum })
  measure_type: string;

  @Column()
  measure_value: number;

  @Column()
  customer_code: string;

  @Column()
  image_url: string;

  @Column({ default: 0 })
  has_confirmed: number;
}
