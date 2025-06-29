import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // ConfigService의 get 메서드를 모킹
              switch (key) {
                case 'ENVIRONMENT':
                  return 'test';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getName', () => {
    it('should return greeting with provided name', () => {
      expect(appController.getName('John')).toBe('Hello, John!');
    });

    it('should return greeting with Guest when name is empty string', () => {
      expect(appController.getName('')).toBe('Hello, Guest!');
    });
  });

  describe('getNameByParam', () => {
    it('should return greeting with provided name parameter', () => {
      expect(appController.getNameByParam('Alice')).toBe('Hello, Alice!');
    });
  });
});
