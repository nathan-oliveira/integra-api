import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { UploadMeasureDto } from './upload-measure.dto';

export class CreateMeasureDto extends UploadMeasureDto {
  @ApiProperty({
    type: String,
    description: 'Measure value',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Measure value cannot be empty!' })
  measure_value: number;

  @ApiProperty({
    type: String,
    description: 'Image url',
  })
  @IsNotEmpty({ message: 'Image url cannot be empty!' })
  @MaxLength(255, {
    message: 'Image url must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Image url must be a string' })
  image_url: string;
}
