import { HttpException } from '@nestjs/common';

export class CustomErrorException extends HttpException {
  constructor({ message, name = null, status }) {
    super(message, status);
    this.name = name ?? CustomErrorException.name;
  }
}
