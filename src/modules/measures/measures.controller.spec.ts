import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

faker.seed(12345);

import { MeasureEntity } from './entities/measure.entity';
import { MeasuresService } from './measures.service';
import { MeasuresController } from './measures.controller';

import { GeminiModule } from 'src/modules/gemini/gemini.module';

import {
  mockConfirmMeasureDto,
  mockQueryParamsDto,
  mockReadConfirmMeasureDto,
  mockReadListMeasureDto,
  mockReadUploadMeasureDto,
  mockUploadMeasureDto,
} from 'src/../test/mocks/measures';
import { mockMethodsRepository } from 'src/../test/mocks/default';

describe('MeasuresController', () => {
  let controller: MeasuresController;
  let service: MeasuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MeasureEntity, GeminiModule],
      controllers: [MeasuresController],
      providers: [
        MeasuresService,
        {
          provide: getRepositoryToken(MeasureEntity),
          useValue: mockMethodsRepository,
        },
      ],
    }).compile();

    controller = module.get<MeasuresController>(MeasuresController);
    service = module.get<MeasuresService>(MeasuresService);
  });

  it('controller must be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('must call the method and return the correct parameters', async () => {
      const readUploadMeasureDto = mockReadUploadMeasureDto();

      const findSpy = jest
        .spyOn(controller, 'upload')
        .mockResolvedValueOnce(readUploadMeasureDto);

      const uploadMeasureDto = mockUploadMeasureDto();

      await controller.upload(uploadMeasureDto);

      expect(findSpy).toHaveBeenCalledWith(uploadMeasureDto);
    });

    it('should call the method and return invalid parameters', async () => {
      const readUploadMeasureDto = mockReadUploadMeasureDto();

      const findSpy = jest
        .spyOn(controller, 'upload')
        .mockResolvedValueOnce(readUploadMeasureDto);

      const uploadMeasureDto = mockUploadMeasureDto();

      await controller.upload(null);

      expect(findSpy).not.toHaveBeenCalledWith(uploadMeasureDto);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'upload').mockRejectedValueOnce(new Error());

      const uploadMeasureDto = mockUploadMeasureDto();

      expect(controller.upload(uploadMeasureDto)).rejects.toThrow(new Error());
    });

    it('should call the method and return the result', async () => {
      const readUploadMeasureDto = mockReadUploadMeasureDto();

      jest
        .spyOn(controller, 'upload')
        .mockResolvedValueOnce(readUploadMeasureDto);

      const uploadMeasureDto = mockUploadMeasureDto();

      expect(
        await controller.upload(uploadMeasureDto),
      ).toEqual(readUploadMeasureDto);
    });
  });

  describe('confirm', () => {
    it('must call the method and return the correct parameters', async () => {
      const readConfirmMeasureDto = mockReadConfirmMeasureDto();

      const findSpy = jest
        .spyOn(controller, 'confirm')
        .mockResolvedValueOnce(readConfirmMeasureDto);

      const confirmMeasureDto = mockConfirmMeasureDto();

      await controller.confirm(confirmMeasureDto);

      expect(findSpy).toHaveBeenCalledWith(confirmMeasureDto);
    });

    it('should call the method and return invalid parameters', async () => {
      const readConfirmMeasureDto = mockReadConfirmMeasureDto();

      const findSpy = jest
        .spyOn(controller, 'confirm')
        .mockResolvedValueOnce(readConfirmMeasureDto);

      const confirmMeasureDto = mockConfirmMeasureDto();

      await controller.confirm(null);

      expect(findSpy).not.toHaveBeenCalledWith(confirmMeasureDto);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'confirm').mockRejectedValueOnce(new Error());

      const confirmMeasureDto = mockConfirmMeasureDto();

      expect(controller.confirm(confirmMeasureDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const readConfirmMeasureDto = mockReadConfirmMeasureDto();

      jest
        .spyOn(controller, 'confirm')
        .mockResolvedValueOnce(readConfirmMeasureDto);

      const confirmMeasureDto = mockConfirmMeasureDto();

      expect(await controller.confirm(confirmMeasureDto)).toEqual(
        readConfirmMeasureDto,
      );
    });
  });

  describe(':id/list', () => {
    it('must call the method and return the correct parameters', async () => {
      const readListMeasureDto = mockReadListMeasureDto();

      const findSpy = jest
        .spyOn(controller, 'getAll')
        .mockResolvedValueOnce(readListMeasureDto);

      const customer_code = faker.string.uuid();
      const queryParamsDto = mockQueryParamsDto();

      await controller.getAll(customer_code, queryParamsDto);

      expect(findSpy).toHaveBeenCalledWith(customer_code, queryParamsDto);
    });

    it('should call the method and return invalid parameters', async () => {
      const readListMeasureDto = mockReadListMeasureDto();

      const findSpy = jest
        .spyOn(controller, 'getAll')
        .mockResolvedValueOnce(readListMeasureDto);

      const customer_code = faker.string.uuid();
      const queryParamsDto = mockQueryParamsDto();

      await controller.getAll(null, queryParamsDto);

      expect(findSpy).not.toHaveBeenCalledWith(customer_code, queryParamsDto);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'getAll').mockRejectedValueOnce(new Error());

      const customer_code = faker.string.uuid();
      const queryParamsDto = mockQueryParamsDto();

      expect(controller.getAll(customer_code, queryParamsDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should call the method and return the result', async () => {
      const readListMeasureDto = mockReadListMeasureDto();

      jest
        .spyOn(controller, 'getAll')
        .mockResolvedValueOnce(readListMeasureDto);

      const customer_code = faker.string.uuid();
      const queryParamsDto = mockQueryParamsDto();

      expect(await controller.getAll(customer_code, queryParamsDto)).toEqual(
        readListMeasureDto,
      );
    });
  });
});
