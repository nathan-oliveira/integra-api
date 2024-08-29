import { Injectable, Inject } from '@nestjs/common';
import {
  GoogleAIFileManager,
  UploadFileResponse,
} from '@google/generative-ai/server';

import { GEMINI_VISION_MODEL, GEMINI_GENERATIVE_MODEL } from './constants';
import { UploadFileGeminiDto } from './dtos/upload-file-gemini.dto';
import { GenerateContentResult, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GEMINI_VISION_MODEL)
    private readonly geminiVisionModel: GoogleAIFileManager,

    @Inject(GEMINI_GENERATIVE_MODEL)
    private readonly geminiGenerativeModel: GenerativeModel,
  ) {}

  async upload(
    uploadFileGeminiDto: UploadFileGeminiDto,
  ): Promise<UploadFileResponse> {
    const { filePath, ...restUploadFileGeminiDto } = uploadFileGeminiDto;
    return this.geminiVisionModel.uploadFile(filePath, restUploadFileGeminiDto);
  }

  async generateContent(
    prompt: string,
    uploadResponse: UploadFileResponse,
  ): Promise<GenerateContentResult> {
    const {
      file: { uri: fileUri, mimeType },
    } = uploadResponse;
    return this.geminiGenerativeModel.generateContent([
      { fileData: { mimeType, fileUri } },
      { text: prompt },
    ]);
  }
}
