import { HttpException, HttpStatus } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

class CorsConfig {
  private readonly exposedHeaders = ['X-Total-Items'];

  constructor(readonly configService: ConfigService) {}

  getConfig(): CorsOptions {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const domains = this.configService.get<string>('CORS_RELEASED_DOMAINS');
    if (nodeEnv === 'development' || domains.trim() === '*')
      return { exposedHeaders: this.exposedHeaders };

    return {
      exposedHeaders: this.exposedHeaders,
      origin: function (origin, callback) {
        if (domains.split(',').indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(
            new HttpException('Not allowed by CORS', HttpStatus.UNAUTHORIZED),
          );
        }
      },
      credentials: true,
      methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
      allowedHeaders:
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    };
  }
}

export default CorsConfig;
