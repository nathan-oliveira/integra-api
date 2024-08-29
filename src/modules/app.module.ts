import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from 'src/config/orm.config';
import { MeasuresModule } from './measures/measures.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync(ormConfig),
    MeasuresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
