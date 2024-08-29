import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

import { IsNotNaN } from 'src/common/decorators/is-not-nan.decorator';
import { IsNumberNotOneOrTwo } from 'src/common/decorators/is-number-not-one-or-two.decorator';

export class ConfirmMeasureDto {
  @ApiProperty({
    type: String,
    description: 'Measure uuid',
  })
  @IsNotEmpty({ message: 'Measure uuid cannot be empty!' })
  @MaxLength(255, {
    message: 'Measure uuid must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Measure uuid must be a string' })
  @IsUUID('4', { message: 'measure_uuid must be a uuid!' })
  measure_uuid: string;

  @ApiProperty({
    type: String,
    description: 'Confirmed value',
  })
  @IsNotEmpty({ message: 'Confirmed value cannot be empty!' })
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  @IsNotNaN()
  @IsNumberNotOneOrTwo()
  confirmed_value: number;
}
