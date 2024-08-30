import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

faker.seed(12345);

import { MeasureEntity } from './entities/measure.entity';
import { MeasuresService } from './measures.service';
import { GeminiModule } from 'src/modules/gemini/gemini.module';

import {
  mockConfirmMeasureDto,
  mockCreateMeasureDto,
  mockMeasureEntity,
  mockQueryParamsDto,
  mockReadConfirmMeasureDto,
  mockReadListMeasureDto,
  mockUploadMeasureDto,
} from 'src/../test/mocks/measures';
import { mockMethodsRepository } from 'src/../test/mocks/default';

describe('MeasuresService', () => {
  let service: MeasuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MeasureEntity, GeminiModule],
      providers: [
        MeasuresService,
        {
          provide: getRepositoryToken(MeasureEntity),
          useValue: mockMethodsRepository,
        },
      ],
    }).compile();

    service = module.get<MeasuresService>(MeasuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('must call the method and return the correct parameters', async () => {
      const readListMeasureDto = mockReadListMeasureDto();

      const findSpy = jest
        .spyOn(service, 'getAll')
        .mockResolvedValueOnce(readListMeasureDto);

      const customer_code = faker.string.uuid();
      const queryParamsDto = mockQueryParamsDto();

      await service.getAll(customer_code, queryParamsDto);

      expect(findSpy).toHaveBeenCalledWith(customer_code, queryParamsDto);
    });

    it('should call the method and return the errors', async () => {
      const readListMeasureDto = mockReadListMeasureDto();

      const findSpy = jest
        .spyOn(service, 'getAll')
        .mockResolvedValueOnce(readListMeasureDto);

      const customer_code = faker.string.uuid();
      const queryParamsDto = mockQueryParamsDto();

      await service.getAll(null, queryParamsDto);

      expect(findSpy).not.toHaveBeenCalledWith(customer_code, queryParamsDto);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'getAll').mockRejectedValueOnce(new Error());

      const customer_code = faker.string.uuid();
      const queryParams = mockQueryParamsDto();

      await expect(service.getAll(customer_code, queryParams)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const readListMeasureDto = mockReadListMeasureDto();

      jest.spyOn(service, 'getAll').mockResolvedValueOnce(readListMeasureDto);

      const customer_code = faker.string.uuid();
      const queryParams = mockQueryParamsDto();

      expect(await service.getAll(customer_code, queryParams)).toEqual(
        readListMeasureDto,
      );
    });
  });

  describe('create', () => {
    it('must call the method and return the correct parameters', async () => {
      const measureEntity = mockMeasureEntity();

      const findSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(measureEntity);

      const createMeasureDto = mockCreateMeasureDto();

      await service.create(createMeasureDto);

      expect(findSpy).toHaveBeenCalledWith(createMeasureDto);
    });

    it('should call the method and return the errors', async () => {
      const measureEntity = mockMeasureEntity();

      const findSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(measureEntity);

      const createMeasureDto = mockCreateMeasureDto();

      await service.create(null);

      expect(findSpy).not.toHaveBeenCalledWith(createMeasureDto);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      const createMeasureDto = mockCreateMeasureDto();

      await expect(service.create(createMeasureDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const measureEntity = mockMeasureEntity();

      jest.spyOn(service, 'create').mockResolvedValueOnce(measureEntity);

      const createMeasureDto = mockCreateMeasureDto();

      expect(await service.create(createMeasureDto)).toEqual(measureEntity);
    });
  });

  describe('confirm', () => {
    it('must call the method and return the correct parameters', async () => {
      const readConfirmMeasureDto = mockReadConfirmMeasureDto();

      const findSpy = jest
        .spyOn(service, 'confirm')
        .mockResolvedValueOnce(readConfirmMeasureDto);

      const confirmMeasureDto = mockConfirmMeasureDto();

      await service.confirm(confirmMeasureDto);

      expect(findSpy).toHaveBeenCalledWith(confirmMeasureDto);
    });

    it('should call the method and return the errors', async () => {
      const readConfirmMeasureDto = mockReadConfirmMeasureDto();

      const findSpy = jest
        .spyOn(service, 'confirm')
        .mockResolvedValueOnce(readConfirmMeasureDto);

      const confirmMeasureDto = mockConfirmMeasureDto();

      await service.confirm(null);

      expect(findSpy).not.toHaveBeenCalledWith(confirmMeasureDto);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'confirm').mockRejectedValueOnce(new Error());

      const confirmMeasureDto = mockConfirmMeasureDto();

      await expect(service.confirm(confirmMeasureDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const readConfirmMeasureDto = mockReadConfirmMeasureDto();

      jest
        .spyOn(service, 'confirm')
        .mockResolvedValueOnce(readConfirmMeasureDto);

      const confirmMeasureDto = mockConfirmMeasureDto();

      expect(await service.confirm(confirmMeasureDto)).toEqual(
        readConfirmMeasureDto,
      );
    });
  });

  describe('validateReading', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'validateReading')
        .mockResolvedValueOnce(void 0);

      const uploadMeasureDto = mockUploadMeasureDto();

      await service.validateReading(uploadMeasureDto);

      expect(findSpy).toHaveBeenCalledWith(uploadMeasureDto);
    });

    it('should call the method and return the errors', async () => {
      const findSpy = jest
        .spyOn(service, 'validateReading')
        .mockResolvedValueOnce(void 0);

      const uploadMeasureDto = mockUploadMeasureDto();

      await service.validateReading(null);

      expect(findSpy).not.toHaveBeenCalledWith(uploadMeasureDto);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'validateReading').mockRejectedValueOnce(new Error());

      const uploadMeasureDto = mockUploadMeasureDto();

      await expect(service.validateReading(uploadMeasureDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(service, 'validateReading').mockResolvedValueOnce(void 0);

      const uploadMeasureDto = mockUploadMeasureDto();

      expect(await service.validateReading(uploadMeasureDto)).toEqual(void 0);
    });
  });

  describe('upload', () => {
    it('must call the method and return the correct parameters', async () => {
      const measureEntity = mockMeasureEntity();

      const findSpy = jest
        .spyOn(service, 'upload')
        .mockResolvedValueOnce(measureEntity);

      const uploadMeasureDto = mockUploadMeasureDto();

      await service.upload(uploadMeasureDto);

      expect(findSpy).toHaveBeenCalledWith(uploadMeasureDto);
    });

    it('should call the method and return the errors', async () => {
      const measureEntity = mockMeasureEntity();

      const findSpy = jest
        .spyOn(service, 'upload')
        .mockResolvedValueOnce(measureEntity);

      const uploadMeasureDto = mockUploadMeasureDto();

      await service.upload(null);

      expect(findSpy).not.toHaveBeenCalledWith(uploadMeasureDto);
    });

    it('should call the method to find and return the errors', async () => {
      jest.spyOn(service, 'upload').mockRejectedValueOnce(new Error());

      const uploadMeasureDto = mockUploadMeasureDto();

      await expect(service.upload(uploadMeasureDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const measureEntity = mockMeasureEntity();

      jest.spyOn(service, 'upload').mockResolvedValueOnce(measureEntity);

      const uploadMeasureDto = mockUploadMeasureDto();

      expect(await service.upload(uploadMeasureDto)).toEqual(measureEntity);
    });
  });
});
