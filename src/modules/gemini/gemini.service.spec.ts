import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { GenerateContentResult } from '@google/generative-ai';
import { UploadFileResponse } from '@google/generative-ai/dist/server/server';
import { faker } from '@faker-js/faker';

faker.seed(12345);

import { GeminiService } from './gemini.service';
import {
  GeminiGenerativeModelProvider,
  GeminiVisionModelProvider,
} from './gemini.provider';
import {
  mockGenerateContentResult,
  mockPrompt,
  mockUploadFileGeminiDto,
  mockUploadFileResponse,
} from 'src/../test/mocks/gemini';

describe('GeminiService', () => {
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ConfigService,
        GeminiService,
        GeminiVisionModelProvider,
        GeminiGenerativeModelProvider,
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('must call the method and return the correct parameters', async () => {
      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      const findSpy = jest
        .spyOn(service, 'upload')
        .mockResolvedValueOnce(uploadFileResponse);

      const uploadFileGeminiDto = mockUploadFileGeminiDto();

      await service.upload(uploadFileGeminiDto);

      expect(findSpy).toHaveBeenCalledWith(uploadFileGeminiDto);
    });

    it('should call the method and return the errors', async () => {
      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      const findSpy = jest
        .spyOn(service, 'upload')
        .mockResolvedValueOnce(uploadFileResponse);

      const uploadFileGeminiDto = mockUploadFileGeminiDto();

      await service.upload(null);

      expect(findSpy).not.toHaveBeenCalledWith(uploadFileGeminiDto);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'upload').mockRejectedValueOnce(new Error());

      const uploadFileGeminiDto = mockUploadFileGeminiDto();

      await expect(service.upload(uploadFileGeminiDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      jest.spyOn(service, 'upload').mockResolvedValueOnce(uploadFileResponse);

      const uploadFileGeminiDto = mockUploadFileGeminiDto();

      expect(await service.upload(uploadFileGeminiDto)).toEqual(
        uploadFileResponse,
      );
    });
  });

  describe('generateContent', () => {
    it('must call the method and return the correct parameters', async () => {
      const generateContentResult =
        mockGenerateContentResult() as GenerateContentResult;

      const findSpy = jest
        .spyOn(service, 'generateContent')
        .mockResolvedValueOnce(generateContentResult);

      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      await service.generateContent(mockPrompt, uploadFileResponse);

      expect(findSpy).toHaveBeenCalledWith(mockPrompt, uploadFileResponse);
    });

    it('should call the method and return the errors', async () => {
      const generateContentResult =
        mockGenerateContentResult() as GenerateContentResult;

      const findSpy = jest
        .spyOn(service, 'generateContent')
        .mockResolvedValueOnce(generateContentResult);

      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      await service.generateContent(null, uploadFileResponse);

      expect(findSpy).not.toHaveBeenCalledWith(mockPrompt, uploadFileResponse);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'generateContent').mockRejectedValueOnce(new Error());

      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      await expect(
        service.generateContent(mockPrompt, uploadFileResponse),
      ).rejects.toThrow(new Error());
    });

    it('should call the method and return the result', async () => {
      const generateContentResult =
        mockGenerateContentResult() as GenerateContentResult;

      jest
        .spyOn(service, 'generateContent')
        .mockResolvedValueOnce(generateContentResult);

      const uploadFileResponse = mockUploadFileResponse() as UploadFileResponse;

      expect(
        await service.generateContent(mockPrompt, uploadFileResponse),
      ).toEqual(generateContentResult);
    });
  });
});
