import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';

import { isUUID } from 'class-validator';

import { CustomErrorException } from '../errors/custom-error.exception';

export const validateId = (value: string) => {
  if (!isUUID(value)) {
    throw new CustomErrorException({
      message: 'The provided identification must be a uuid!',
      status: HttpStatus.BAD_REQUEST,
      name: 'INVALID_PARAM_ID',
    });
  }

  return value;
};

export const ParamId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const value = context.switchToHttp().getRequest().params.id;
    return validateId(value);
  },
);
