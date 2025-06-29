import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

describe('BoardController', () => {
  let controller: BoardController;

  const mockBoardService = {
    findAll: jest.fn(),
    find: jest.fn(),
    getNextId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: mockBoardService,
        },
      ],
    }).compile();

    controller = module.get<BoardController>(BoardController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of boards', () => {
      const expectedBoards: BoardEntity[] = [
        { id: 1, title: '테스트 제목', content: '테스트 내용' },
        { id: 2, title: '테스트 제목 2', content: '테스트 내용 2' },
      ];

      mockBoardService.findAll.mockReturnValue(expectedBoards);

      const result = controller.findAll();

      expect(result).toBe(expectedBoards);
      expect(mockBoardService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('should return a board by id', () => {
      const expectedBoard: BoardEntity = {
        id: 1,
        title: '테스트 제목',
        content: '테스트 내용',
      };

      mockBoardService.find.mockReturnValue(expectedBoard);

      const result = controller.find(1);

      expect(result).toBe(expectedBoard);
      expect(mockBoardService.find).toHaveBeenCalledWith(1);
      expect(mockBoardService.find).toHaveBeenCalledTimes(1);
    });

    it('should return undefined for non-existent id', () => {
      mockBoardService.find.mockReturnValue(undefined);

      const result = controller.find(999);

      expect(result).toBeUndefined();
      expect(mockBoardService.find).toHaveBeenCalledWith(999);
    });
  });

  describe('getNextId', () => {
    it('should return next available id', () => {
      const expectedId = 11;
      mockBoardService.getNextId.mockReturnValue(expectedId);

      const result = controller.getNextId();

      expect(result).toEqual({ nextId: expectedId });
      expect(mockBoardService.getNextId).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new board', () => {
      const createBoardDto: CreateBoardDto = {
        title: '새 게시글',
        content: '새 게시글 내용',
      };

      const expectedBoard: BoardEntity = {
        id: 11,
        ...createBoardDto,
      };

      mockBoardService.create.mockReturnValue(expectedBoard);

      const result = controller.create(createBoardDto);

      expect(result).toBe(expectedBoard);
      expect(mockBoardService.create).toHaveBeenCalledWith(createBoardDto);
      expect(mockBoardService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing board', () => {
      const updateBoardDto: UpdateBoardDto = {
        title: '수정된 제목',
        content: '수정된 내용',
      };

      const expectedBoard: BoardEntity = {
        id: 1,
        title: '수정된 제목',
        content: '수정된 내용',
      };

      mockBoardService.update.mockReturnValue(expectedBoard);

      const result = controller.update(1, updateBoardDto);

      expect(result).toBe(expectedBoard);
      expect(mockBoardService.update).toHaveBeenCalledWith(1, updateBoardDto);
      expect(mockBoardService.update).toHaveBeenCalledTimes(1);
    });

    it('should return null for non-existent board', () => {
      const updateBoardDto: UpdateBoardDto = {
        title: '수정할 수 없는 제목',
      };

      mockBoardService.update.mockReturnValue(null);

      const result = controller.update(999, updateBoardDto);

      expect(result).toBeNull();
      expect(mockBoardService.update).toHaveBeenCalledWith(999, updateBoardDto);
    });
  });

  describe('delete', () => {
    it('should delete an existing board', () => {
      const expectedBoard: BoardEntity = {
        id: 1,
        title: '삭제될 게시글',
        content: '삭제될 내용',
      };

      mockBoardService.delete.mockReturnValue(expectedBoard);

      const result = controller.delete(1);

      expect(result).toBe(expectedBoard);
      expect(mockBoardService.delete).toHaveBeenCalledWith(1);
      expect(mockBoardService.delete).toHaveBeenCalledTimes(1);
    });

    it('should return null for non-existent board', () => {
      mockBoardService.delete.mockReturnValue(null);

      const result = controller.delete(999);

      expect(result).toBeNull();
      expect(mockBoardService.delete).toHaveBeenCalledWith(999);
    });
  });
});
