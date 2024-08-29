import { Response } from 'express';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Catch,
} from '@nestjs/common';

import { errorMessagesPostgresql } from 'src/database/errors/error-messages';

import { HttpExceptionDto } from './dto/http-exception.dto';
import { customTypeError } from '../errors/custom-type-errors';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionDto, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let error_description =
      typeof exception.response !== 'object'
        ? exception.message
        : exception.response.message;

    if (exception.code && errorMessagesPostgresql[exception.code])
      error_description = errorMessagesPostgresql[exception.code];

    const statusCode = exception.status || HttpStatus.BAD_REQUEST;
    const error_code =
      exception.name !== 'CustomErrorException'
        ? exception.name
        : (customTypeError[statusCode] ?? 'BAD_REQUEST');
    return response.status(statusCode).json({ error_code, error_description });
  }
}
