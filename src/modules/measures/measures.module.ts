import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GeminiModule } from 'src/modules/gemini/gemini.module';

import { MeasureEntity } from './entities/measure.entity';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasureEntity]), GeminiModule],
  controllers: [MeasuresController],
  providers: [MeasuresService],
})
export class MeasuresModule {}
