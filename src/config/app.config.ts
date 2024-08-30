import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

import CorsConfig from './cors.config';
import SwaggerConfig from './swagger.config';

export class AppConfig {
  private app: NestExpressApplication;
  private configService: ConfigService;

  constructor(
    readonly appNest: NestExpressApplication,
    readonly configServiceNest: ConfigService,
  ) {
    this.app = appNest;
    this.configService = configServiceNest;
    this.enableCors();
    this.setGlobalConfigs();
    this.setCompressionExpress();
    this.setSecurityHelmet();
    this.enableSwagger();
  }

  private enableCors(): void {
    const config = Reflect.construct(CorsConfig, [this.configService]);
    this.app.enableCors(config.getConfig());
  }

  private setGlobalConfigs(): void {
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useBodyParser('json'); // , { limit: '500mb' }
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  private enableSwagger = () => SwaggerConfig.handler(this.app);

  private setCompressionExpress = () => this.app.use(compression());

  private setSecurityHelmet() {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'cdnjs.cloudflare.com'],
            objectSrc: ["'none'"],
          },
        },
        frameguard: {
          action: 'deny',
        },
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
        dnsPrefetchControl: false,
        hidePoweredBy: true,
        ieNoOpen: true,
        noSniff: true,
        xssFilter: true,
      }),
    );
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`[+] http://localhost:${port}`));
  }
}
