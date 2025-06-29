import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of boards', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
    });
  });

  describe('find', () => {
    it('should return a board by id', () => {
      const result = service.find(1);
      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.title).toBe('첫 번째 게시글');
    });

    it('should return undefined for non-existent id', () => {
      const result = service.find(999);
      expect(result).toBeUndefined();
    });
  });

  describe('getNextId', () => {
    it('should return next available id', () => {
      const result = service.getNextId();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(10); // 초기 데이터가 10개이므로
    });
  });

  describe('getBoardIndex', () => {
    it('should return correct index for existing board', () => {
      const result = service.getBoardIndex(1);
      expect(result).toBe(0); // 첫 번째 게시글의 인덱스
    });

    it('should return -1 for non-existent board', () => {
      const result = service.getBoardIndex(999);
      expect(result).toBe(-1);
    });
  });

  describe('create', () => {
    it('should create a new board', () => {
      const createBoardDto: CreateBoardDto = {
        title: '테스트 게시글',
        content: '테스트 내용입니다.',
      };

      const initialCount = service.findAll().length;
      const result = service.create(createBoardDto);

      expect(result).toBeDefined();
      expect(result.title).toBe(createBoardDto.title);
      expect(result.content).toBe(createBoardDto.content);
      expect(result.id).toBeDefined();
      expect(service.findAll().length).toBe(initialCount + 1);
    });
  });

  describe('update', () => {
    it('should update an existing board', () => {
      const updateBoardDto: UpdateBoardDto = {
        title: '수정된 제목',
        content: '수정된 내용',
      };

      const result = service.update(1, updateBoardDto);
      expect(result).toBeDefined();
      expect(result?.title).toBe(updateBoardDto.title);
      expect(result?.content).toBe(updateBoardDto.content);
      expect(result?.id).toBe(1);
    });

    it('should partially update an existing board', () => {
      const originalBoard = service.find(2);
      const updateBoardDto: UpdateBoardDto = {
        title: '부분 수정된 제목',
      };

      const result = service.update(2, updateBoardDto);
      expect(result).toBeDefined();
      expect(result?.title).toBe(updateBoardDto.title);
      expect(result?.content).toBe(originalBoard?.content); // 내용은 그대로
      expect(result?.id).toBe(2);
    });

    it('should return null for non-existent board', () => {
      const updateBoardDto: UpdateBoardDto = {
        title: '수정할 수 없는 제목',
      };

      const result = service.update(999, updateBoardDto);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete an existing board', () => {
      const initialCount = service.findAll().length;
      const boardToDelete = service.find(3);

      const result = service.delete(3);

      expect(result).toBeDefined();
      expect(result?.id).toBe(3);
      expect(result?.title).toBe(boardToDelete?.title);
      expect(service.findAll().length).toBe(initialCount - 1);
      expect(service.find(3)).toBeUndefined();
    });

    it('should return null for non-existent board', () => {
      const initialCount = service.findAll().length;
      const result = service.delete(999);

      expect(result).toBeNull();
      expect(service.findAll().length).toBe(initialCount);
    });
  });
});
