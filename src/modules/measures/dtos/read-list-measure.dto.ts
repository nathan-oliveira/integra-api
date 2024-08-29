import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ReadMeasureDto {
  @ApiProperty({
    type: String,
    description: 'UUID of the measure',
  })
  measure_uuid: string;

  @ApiProperty({
    type: String,
    description: 'Date and time of the measure',
  })
  measure_datetime: string;

  @ApiProperty({
    type: String,
    description: 'Type of the measure',
  })
  measure_type: string;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the measure is confirmed',
  })
  @Transform(({ value }) => Boolean(value), { toClassOnly: true })
  has_confirmed: boolean;

  @ApiProperty({
    type: String,
    description: 'URL of the image',
  })
  image_url: string;
}

export class ReadListMeasureDto {
  customer_code: string;
  measures: ReadMeasureDto[];
}
