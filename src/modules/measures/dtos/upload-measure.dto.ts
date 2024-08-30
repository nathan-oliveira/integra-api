import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength, IsEnum } from 'class-validator';
import { MeasureTypeEnum } from '../enums';

export class UploadMeasureDto {
  @ApiProperty({
    type: String,
    description: 'Customer code',
  })
  @IsNotEmpty({ message: 'Customer code cannot be empty!' })
  @MaxLength(255, {
    message: 'Customer code must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Customer code must be a string' })
  customer_code: string;

  @ApiProperty({
    type: String,
    description: 'Measure datetime',
  })
  @IsNotEmpty({ message: 'Measure datetime cannot be empty!' })
  @IsString({ message: 'Measure datetime must be a string' })
  measure_datetime: string;

  @ApiProperty({
    type: String,
    description: 'Measure type',
  })
  @IsNotEmpty({ message: 'Measure type cannot be empty!' })
  @IsEnum(Object.values(MeasureTypeEnum), { message: 'Invalid type!' })
  @IsString({ message: 'Measure type must be a string' })
  measure_type: string;

  @ApiProperty({
    type: String,
    description: 'Image Base64',
  })
  @IsNotEmpty({ message: 'Image type cannot be empty!' })
  // @IsString({ message: 'Image must be a string' })
  image: string;
}
