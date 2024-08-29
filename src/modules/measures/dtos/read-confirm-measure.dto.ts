import { ApiProperty } from '@nestjs/swagger';

export class ReadConfirmMeasureDto {
  @ApiProperty({
    type: Boolean,
    description: 'success',
  })
  success: boolean;
}
