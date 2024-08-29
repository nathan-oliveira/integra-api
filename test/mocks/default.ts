import { Readable } from 'stream';
import { faker } from '@faker-js/faker';

const buffer = Buffer.from(faker.image.dataUri(), 'base64');

export const createReadStream = () => {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
};

const stream = createReadStream();

export const mockExpressMulterFile: Express.Multer.File = {
  fieldname: 'file',
  originalname: 'test-image.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '/tmp/',
  filename: 'test-image.jpg',
  path: '/tmp/test-image.jpg',
  size: buffer.length,
  buffer,
  stream,
};

export const mockMethodsRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
  insert: jest.fn(),
  remove: jest.fn(),
};
