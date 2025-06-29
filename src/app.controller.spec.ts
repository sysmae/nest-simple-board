import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello('127.0.0.1')).toBe('Hello World!');
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
