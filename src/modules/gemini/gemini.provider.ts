import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

import { GEMINI_VISION_MODEL, GEMINI_GENERATIVE_MODEL } from './constants';

export const GeminiGenerativeModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_GENERATIVE_MODEL,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const apiKey = configService.get('GEMINI_API_KEY');
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  },
};

export const GeminiVisionModelProvider: Provider<GoogleAIFileManager> = {
  provide: GEMINI_VISION_MODEL,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const apiKey = configService.get('GEMINI_API_KEY');
    return new GoogleAIFileManager(apiKey);
  },
};
