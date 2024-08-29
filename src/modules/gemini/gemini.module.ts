import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GeminiService } from './gemini.service';
import {
  GeminiGenerativeModelProvider,
  GeminiVisionModelProvider,
} from './gemini.provider';

@Module({
  controllers: [],
  providers: [
    ConfigService,
    GeminiService,
    GeminiVisionModelProvider,
    GeminiGenerativeModelProvider,
  ],
  exports: [
    GeminiService,
    GeminiVisionModelProvider,
    GeminiGenerativeModelProvider,
  ],
})
export class GeminiModule {}
