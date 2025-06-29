import { Test, TestingModule } from '@nestjs/testing';
import { BoardModule } from './board.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

describe('BoardModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [BoardModule],
    }).compile();
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have BoardController', () => {
    const controller = module.get<BoardController>(BoardController);
    expect(controller).toBeDefined();
  });

  it('should have BoardService', () => {
    const service = module.get<BoardService>(BoardService);
    expect(service).toBeDefined();
  });
});
