import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

import { MeasureTypeEnum } from '../enums';

export class CreateMeasureDto {
  @ApiProperty({
    type: String,
    description: 'Identification of the customer UUID code',
  })
  @IsNotEmpty({ message: 'Customer code cannot be empty!' })
  @MaxLength(255, {
    message: 'Customer code must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Customer code must be a string' })
  customer_code: string;

  @ApiProperty({
    type: String,
    description: 'Date and time of measurement',
  })
  @IsNotEmpty({ message: 'Measure datetime cannot be empty!' })
  @IsString({ message: 'Measure datetime must be a string' })
  measure_datetime: string;

  @ApiProperty({
    type: String,
    description: 'Type of measurement Water or gas',
  })
  @IsNotEmpty({ message: 'Measure type cannot be empty!' })
  @IsEnum(Object.values(MeasureTypeEnum), { message: 'Invalid type!' })
  @IsString({ message: 'Measure type must be a string' })
  measure_type: string;

  @ApiProperty({
    type: String,
    description: 'Value of the measure',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Measure value cannot be empty!' })
  measure_value: number;

  @ApiProperty({
    type: String,
    description: 'Url of the temporary measurement image',
  })
  @IsNotEmpty({ message: 'Image url cannot be empty!' })
  @MaxLength(255, {
    message: 'Image url must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Image url must be a string' })
  image_url: string;
}
