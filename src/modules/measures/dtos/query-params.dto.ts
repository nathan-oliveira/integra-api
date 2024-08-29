import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { MeasureTypeEnum } from '../enums';
import { Transform } from 'class-transformer';

export class QueryParamsDto {
  @ApiProperty({
    name: 'search',
    description: 'Filter query parameter for table',
    type: String,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsEnum(Object.values(MeasureTypeEnum), { message: 'Invalid type!' })
  measure_type?: string;
}
