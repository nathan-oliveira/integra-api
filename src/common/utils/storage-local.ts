import { HttpStatus } from '@nestjs/common';

import * as fs from 'fs';
import { writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { dirname, resolve } from 'path';
import { CustomErrorException } from '../errors/custom-error.exception';

interface IUpdateImageStore {
  filePath: string;
  mimeType: string;
  displayName: string;
}

interface IValidateBase64 {
  extension: string;
  base64String: string;
  mimeType: string;
}

const extensionType: { [key: string]: string } = {
  'image/png': '.png',
  'image/jpeg': '.jpeg',
  'image/jpg': '.jpg',
};

const createStorageDirectory = (filePath: string): void => {
  const dirPath = dirname(filePath);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

export const removeImageStorage = (path: string): void => {
  if (fs.existsSync(path)) fs.unlinkSync(path);
};

export const verifyBase64 = (base64: string): IValidateBase64 => {
  if (!base64.startsWith('data:image/')) {
    throw new CustomErrorException({
      message: 'Invalid image!',
      status: HttpStatus.BAD_REQUEST,
    });
  }

  const matches = base64.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  if (!matches) {
    throw new CustomErrorException({
      message: 'Invalid image!',
      status: HttpStatus.BAD_REQUEST,
    });
  }

  const mimeType = matches[1];
  const extension = extensionType[mimeType];
  if (!extension) {
    throw new CustomErrorException({
      message: 'Unsupported image type!',
      status: HttpStatus.BAD_REQUEST,
    });
  }

  return {
    extension,
    base64String: matches[2],
    mimeType,
  };
};

export const updateImageStorage = async (
  base64: string,
): Promise<IUpdateImageStore> => {
  const { extension, base64String, mimeType } = verifyBase64(base64);
  const displayName = `${randomUUID()}${extension}`;
  const filePath = resolve(__dirname, `../../../storage/${displayName}`);

  try {
    createStorageDirectory(filePath);
    await writeFile(filePath, Buffer.from(base64String, 'base64'));
    return { filePath, mimeType, displayName };
  } catch (error) {
    throw new CustomErrorException({
      message: error?.message ?? 'Invalid image!',
      status: HttpStatus.BAD_REQUEST,
    });
  }
};
