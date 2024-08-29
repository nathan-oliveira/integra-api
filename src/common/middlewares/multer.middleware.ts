import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import * as mkdirp from 'mkdirp';

import { generateNameImage } from '../utils/storage-local';

export type IMulterMiddlewareOptions = {
  folder: string;
};

@Injectable()
export class MulterMiddleware {
  static MIME_TYPE_MAP: object = {
    'image/png': '.png',
    'image/jpg': '.jpg',
    'image/jpeg': '.jpeg',
    'image/x-icon': '.ico',
  };

  static getStorage({ folder }: IMulterMiddlewareOptions): MulterOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fileTypeIsValid = MulterMiddleware.MIME_TYPE_MAP[file.mimetype];

          if (fileTypeIsValid) {
            const uploadPath = resolve(__dirname, `../../../storage/${folder}`);
            mkdirp.sync(uploadPath);
            return cb(null, uploadPath);
          }

          return cb(new Error('Invalid file type!'), null);
        },
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const name = generateNameImage();
          callback(null, `${name}${ext}`);
        },
      }),
    };
  }
}
