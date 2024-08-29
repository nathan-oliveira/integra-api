import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './modules/app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const nestApp: NestExpressApplication = await NestFactory.create(AppModule);
  const configService = Reflect.construct(ConfigService, []);
  const port = configService.get<number>('APP_PORT', { infer: true });
  Reflect.construct(AppConfig, [nestApp, configService]).listen(port);
}

bootstrap();
