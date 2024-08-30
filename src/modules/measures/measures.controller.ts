import {
  ClassSerializerInterceptor,
  UseInterceptors,
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

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
  @ApiOkResponse({ type: ReadUploadMeasureDto })
  @ApiBody({ type: UploadMeasureDto })
  async upload(
    @Body() uploadMeasureDto: UploadMeasureDto,
  ): Promise<ReadUploadMeasureDto> {
    const result = await this.measuresService.upload(uploadMeasureDto);
    return plainToClass(ReadUploadMeasureDto, result);
  }

  @Patch('confirm')
  @ApiOkResponse({ type: ReadConfirmMeasureDto })
  @ApiBody({ type: ConfirmMeasureDto })
  async confirm(
    @Body() confirmMeasureDto: ConfirmMeasureDto,
  ): Promise<ReadConfirmMeasureDto> {
    const result = await this.measuresService.confirm(confirmMeasureDto);
    return plainToClass(ReadConfirmMeasureDto, result);
  }

  @Get(':id/list')
  @ApiOkResponse({ type: ReadListMeasureDto })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ type: QueryParamsDto })
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
