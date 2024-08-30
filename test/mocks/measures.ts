import { faker } from '@faker-js/faker';

import {
  ConfirmMeasureDto,
  CreateMeasureDto,
  QueryParamsDto,
  ReadConfirmMeasureDto,
  ReadListMeasureDto,
  ReadMeasureDto,
  ReadUploadMeasureDto,
  UploadMeasureDto,
} from 'src/modules/measures/dtos';

import { MeasureEntity } from 'src/modules/measures/entities/measure.entity';

import { MeasureTypeEnum } from 'src/modules/measures/enums';

export const mockConfirmMeasureDto = (): ConfirmMeasureDto => ({
  measure_uuid: faker.string.uuid(),
  confirmed_value: 1,
});

export const mockCreateMeasureDto = (): CreateMeasureDto => ({
  measure_value: 200,
  image_url: faker.image.url(),
  customer_code: faker.string.uuid(),
  measure_datetime: new Date().toISOString(),
  measure_type: MeasureTypeEnum.WATER,
});

export const mockQueryParamsDto = (): QueryParamsDto => ({
  measure_type: MeasureTypeEnum.WATER,
});

export const mockReadConfirmMeasureDto = (): ReadConfirmMeasureDto => ({
  success: true,
});

export const mockReadMeasureDto = (): ReadMeasureDto => ({
  measure_uuid: faker.string.uuid(),
  measure_datetime: new Date().toISOString(),
  measure_type: MeasureTypeEnum.WATER,
  image_url: faker.image.url(),
  has_confirmed: true,
});

export const mockReadListMeasureDto = (): ReadListMeasureDto => {
  const measures = mockReadMeasureDto();
  return {
    measures: [measures],
    customer_code: faker.string.uuid(),
  };
};

export const mockReadUploadMeasureDto = (): ReadUploadMeasureDto =>
  ({
    image_url: faker.image.url(),
    measure_uuid: faker.string.uuid(),
    measure_value: 200,
  }) as ReadUploadMeasureDto;

export const mockUploadMeasureDto = (): UploadMeasureDto => ({
  customer_code: faker.string.uuid(),
  measure_datetime: new Date().toISOString(),
  measure_type: MeasureTypeEnum.WATER,
  image:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFR...',
});

export const mockMeasureEntity = (): MeasureEntity =>
  ({
    measure_uuid: faker.string.uuid(),
    measure_datetime: new Date(),
    measure_type: MeasureTypeEnum.WATER,
    measure_value: 200,
    customer_code: faker.string.uuid(),
    image_url: faker.image.url(),
    has_confirmed: 1,
  }) as MeasureEntity;
