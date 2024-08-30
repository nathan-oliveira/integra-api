import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';

import { GeminiService } from 'src/modules/gemini/gemini.service';
import { CustomErrorException } from 'src/common/errors/custom-error.exception';
import { removeImageStorage, updateImageStorage } from 'src/common/utils/storage-local';

import { MeasureEntity } from './entities/measure.entity';

import {
  UploadMeasureDto,
  CreateMeasureDto,
  ConfirmMeasureDto,
  ReadConfirmMeasureDto,
  ReadListMeasureDto,
  QueryParamsDto,
  ReadMeasureDto,
} from './dtos';

import { PROMPT_MEASURE } from './constants';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectRepository(MeasureEntity)
    private readonly measureRepository: Repository<MeasureEntity>,
    private readonly geminiService: GeminiService,
  ) {}

  async getAll(
    customer_code: string,
    { measure_type }: QueryParamsDto,
  ): Promise<ReadListMeasureDto> {
    const conditions: FindManyOptions<MeasureEntity> = {
      where: { customer_code },
      select: [
        'measure_uuid',
        'measure_datetime',
        'measure_type',
        'has_confirmed',
        'image_url',
      ],
    };

    if (measure_type) conditions.where['measure_type'] = measure_type;
    const measures = await this.measureRepository.find(conditions);
    return {
      customer_code,
      measures: measures.map((measure) =>
        plainToClass(ReadMeasureDto, measure),
      ),
    };
  }

  async create(createMeasureDto: CreateMeasureDto): Promise<MeasureEntity> {
    const { measure_datetime, ...restCreateMeasureDto } = createMeasureDto;
    const preloadMeasure = this.measureRepository.create({
      ...restCreateMeasureDto,
      measure_datetime: new Date(measure_datetime),
    });
    return this.measureRepository.save(preloadMeasure);
  }

  async confirm(
    confirmMeasureDto: ConfirmMeasureDto,
  ): Promise<ReadConfirmMeasureDto> {
    const { confirmed_value, measure_uuid } = confirmMeasureDto;
    const measure = await this.measureRepository.findOne({
      where: { measure_uuid },
    });
    if (!measure) {
      throw new CustomErrorException({
        message: 'Leitura não encontrada',
        status: HttpStatus.NOT_FOUND,
      });
    }

    if (measure.has_confirmed) {
      throw new CustomErrorException({
        message: 'Leitura do mês já realizada',
        status: HttpStatus.CONFLICT,
        name: 'CONFIRMATION_DUPLICATE',
      });
    }
    await this.measureRepository.save({
      ...measure,
      has_confirmed: confirmed_value,
    });
    return { success: Boolean(confirmed_value) };
  }

  async validateReading(uploadMeasureDto: UploadMeasureDto): Promise<void> {
    const { customer_code, measure_type, measure_datetime } = uploadMeasureDto;
    const [year, month] = measure_datetime.split('T')[0].split('-').map(Number);
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const result = await this.measureRepository.findOne({
      where: {
        customer_code,
        measure_type,
        measure_datetime: Between(startOfMonth, endOfMonth),
      },
    });

    if (result) {
      throw new CustomErrorException({
        message: 'Leitura do mês já realizada',
        status: HttpStatus.CONFLICT,
      });
    }
  }

  async upload(uploadMeasureDto: UploadMeasureDto): Promise<MeasureEntity> {
    await this.validateReading(uploadMeasureDto);
    const { image, ...restUploadMeasureDto } = uploadMeasureDto;
    const resultUpload = await updateImageStorage(image);

    try {
      const uploadResponse = await this.geminiService.upload(resultUpload);
      const contentResponse = await this.geminiService.generateContent(
        PROMPT_MEASURE,
        uploadResponse,
      );
      const measureValue = contentResponse.response.text().replace(/\D/g, '');

      const {
        file: { uri: image_url },
      } = uploadResponse;

      return this.create({
        ...restUploadMeasureDto,
        image_url,
        measure_value: parseInt(measureValue),
      });
    } catch (error) {
      throw error;
    } finally {
      removeImageStorage(resultUpload.filePath);
    }
  }
}
