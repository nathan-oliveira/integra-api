import { faker } from '@faker-js/faker';

export const mockUploadFileResponse = () => ({
  file: {
    name: 'files/n7fowzmxx7sk',
    displayName: 'image.png',
    mimeType: 'image/png',
    sizeBytes: '24033',
    createTime: '2024-08-28T17:22:40.063472Z',
    updateTime: '2024-08-28T17:22:40.063472Z',
    expirationTime: '2024-08-30T17:22:39.996006853Z',
    sha256Hash:
      'YjNmYjdlODgzNmZmYTM5MmVkZmZmNzRiMzRlOWVkNmU3ODk1ZjlkNTc3MmU4MzdlNWU5ZjlkNDY4ZWI5MWI3OA==',
    uri: 'https://generativelanguage.googleapis.com/v1beta/files/n7fowzmxx7sk',
    state: 'ACTIVE',
  },
});

export const mockUploadFileGeminiDto = () => ({
  displayName: 'image.png',
  filePath: faker.image.url(),
  mimeType: 'image/png',
});

export const mockPrompt = 'prompt';

export const mockGenerateContentResult = () => ({
  response: {
    text: jest.fn(),
    functionCall: jest.fn(),
    functionCalls: jest.fn(),
  },
});
