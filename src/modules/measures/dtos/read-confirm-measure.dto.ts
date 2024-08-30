import { ApiProperty } from '@nestjs/swagger';

export class ReadConfirmMeasureDto {
  @ApiProperty({
    type: Boolean,
    description: 'Confirmation of successful return',
  })
  success: boolean;
}
