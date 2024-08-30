import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileGeminiDto {
  @ApiProperty({
    type: String,
    description: 'Url of the uploaded file',
  })
  @IsString({ message: 'filePath must be a string' })
  filePath: string;

  @ApiProperty({
    type: String,
    description: 'Mime type of the uploaded file',
  })
  @IsString({ message: 'mimeType must be a string' })
  mimeType: string;

  @ApiProperty({
    type: String,
    description: 'Name of the uploaded file',
  })
  @IsString({ message: 'displayName must be a string' })
  displayName: string;
}
