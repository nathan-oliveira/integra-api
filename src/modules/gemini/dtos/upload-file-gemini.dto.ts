import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileGeminiDto {
  @ApiProperty({
    type: String,
    description: 'FilePath',
  })
  @IsString({ message: 'filePath must be a string' })
  filePath: string;

  @ApiProperty({
    type: String,
    description: 'MimeType',
  })
  @IsString({ message: 'mimeType must be a string' })
  mimeType: string;

  @ApiProperty({
    type: String,
    description: 'DisplayName',
  })
  @IsString({ message: 'displayName must be a string' })
  displayName: string;
}
