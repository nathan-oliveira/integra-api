import {
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFile,
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { MulterMiddleware } from 'src/common/middlewares/multer.middleware';
import { ParamId } from 'src/common/decorators/param-id.decorator';

import { MeasuresService } from './measures.service';

import {
  UploadMeasureDto,
  ReadUploadMeasureDto,
  ConfirmMeasureDto,
  ReadConfirmMeasureDto,
  QueryParamsDto,
  ReadListMeasureDto,
} from './dtos';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class MeasuresController {
  constructor(private readonly measuresService: MeasuresService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor(
      'image',
      MulterMiddleware.getStorage({ folder: 'measures' }),
    ),
  )
  @ApiOkResponse({ type: ReadUploadMeasureDto })
  async upload(
    @Body() uploadMeasureDto: UploadMeasureDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ReadUploadMeasureDto> {
    const result = await this.measuresService.upload(uploadMeasureDto, image);
    return plainToClass(ReadUploadMeasureDto, result);
  }

  @Patch('confirm')
  async confirm(
    @Body() confirmMeasureDto: ConfirmMeasureDto,
  ): Promise<ReadConfirmMeasureDto> {
    const result = await this.measuresService.confirm(confirmMeasureDto);
    return plainToClass(ReadConfirmMeasureDto, result);
  }

  @Get(':id/list')
  async getAll(
    @ParamId() customerCode: string,
    @Query() queryParamsDto: QueryParamsDto,
  ): Promise<ReadListMeasureDto> {
    const result = await this.measuresService.getAll(
      customerCode,
      queryParamsDto,
    );
    return plainToClass(ReadListMeasureDto, result);
  }
}
