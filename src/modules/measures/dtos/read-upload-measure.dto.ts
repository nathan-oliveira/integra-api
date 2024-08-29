import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { MeasureEntity } from '../entities/measure.entity';

export class ReadUploadMeasureDto extends OmitType(MeasureEntity, [
  'measure_datetime',
  'measure_type',
  'customer_code',
  'has_confirmed',
]) {
  @Exclude()
  measure_datetime: Date;

  @Exclude()
  measure_type: string;

  @Exclude()
  customer_code: string;

  @Exclude()
  has_confirmed: number;
}
