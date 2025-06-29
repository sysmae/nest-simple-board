import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { BoardEntity } from '../src/board/entities/board.entity';
import { UpdateBoardDto } from '../src/board/dto/update-board.dto';

// 응답 타입 정의
interface NextIdResponse {
  nextId: number;
}

type BoardListResponse = BoardEntity[];

// 테스트용 타입 정의
interface TestBoardData {
  title: string;
  content: string;
}

interface InvalidBoardData {
  title?: string;
  content?: string;
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // ValidationPipe 설정 (main.ts와 동일하게)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/board (GET)', () => {
    it('should return all boards', () => {
      return request(app.getHttpServer())
        .get('/board')
        .expect(200)
        .expect((res) => {
          const boards = res.body as BoardListResponse;
          expect(Array.isArray(boards)).toBe(true);
          expect(boards.length).toBeGreaterThan(0);
          expect(boards[0]).toHaveProperty('id');
          expect(boards[0]).toHaveProperty('title');
          expect(boards[0]).toHaveProperty('content');
        });
    });
  });

  describe('/board/:id (GET)', () => {
    it('should return a specific board', () => {
      return request(app.getHttpServer())
        .get('/board/1')
        .expect(200)
        .expect((res) => {
          const board = res.body as BoardEntity;
          expect(board).toHaveProperty('id', 1);
          expect(board).toHaveProperty('title');
          expect(board).toHaveProperty('content');
        });
    });

    it('should return empty object for non-existent board', () => {
      return request(app.getHttpServer())
        .get('/board/999')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({});
        });
    });

    it('should return 400 for invalid id format', () => {
      return request(app.getHttpServer()).get('/board/invalid').expect(400);
    });
  });

  describe('/board/next-id (GET)', () => {
    it('should return next available id', () => {
      return request(app.getHttpServer())
        .get('/board/next-id')
        .expect(200)
        .expect((res) => {
          const response = res.body as NextIdResponse;
          expect(response).toHaveProperty('nextId');
          expect(typeof response.nextId).toBe('number');
          expect(response.nextId).toBeGreaterThan(10);
        });
    });
  });

  describe('/board (POST)', () => {
    it('should create a new board', () => {
      const newBoard: TestBoardData = {
        title: 'E2E 테스트 게시글',
        content: 'E2E 테스트로 생성된 게시글입니다.',
      };

      return request(app.getHttpServer())
        .post('/board')
        .send(newBoard)
        .expect(201)
        .expect((res) => {
          const createdBoard = res.body as BoardEntity;
          expect(createdBoard).toHaveProperty('id');
          expect(createdBoard.title).toBe(newBoard.title);
          expect(createdBoard.content).toBe(newBoard.content);
        });
    });

    it('should return 400 for missing title', () => {
      const invalidBoard: InvalidBoardData = {
        content: '제목이 없는 게시글',
      };

      return request(app.getHttpServer())
        .post('/board')
        .send(invalidBoard)
        .expect(400);
    });

    it('should return 400 for missing content', () => {
      const invalidBoard: InvalidBoardData = {
        title: '내용이 없는 게시글',
      };

      return request(app.getHttpServer())
        .post('/board')
        .send(invalidBoard)
        .expect(400);
    });

    it('should return 400 for title too long', () => {
      const invalidBoard: InvalidBoardData = {
        title: 'a'.repeat(101), // 101자 (최대 100자)
        content: '유효한 내용',
      };

      return request(app.getHttpServer())
        .post('/board')
        .send(invalidBoard)
        .expect(400);
    });
  });

  describe('/board/:id (PUT)', () => {
    it('should update an existing board', () => {
      const updateData: UpdateBoardDto = {
        title: '수정된 제목',
        content: '수정된 내용',
      };

      return request(app.getHttpServer())
        .put('/board/1')
        .send(updateData)
        .expect(200)
        .expect((res) => {
          const updatedBoard = res.body as BoardEntity;
          expect(updatedBoard.id).toBe(1);
          expect(updatedBoard.title).toBe(updateData.title);
          expect(updatedBoard.content).toBe(updateData.content);
        });
    });

    it('should partially update an existing board', () => {
      const updateData: Partial<UpdateBoardDto> = {
        title: '부분 수정된 제목',
      };

      return request(app.getHttpServer())
        .put('/board/2')
        .send(updateData)
        .expect(200)
        .expect((res) => {
          const updatedBoard = res.body as BoardEntity;
          expect(updatedBoard.id).toBe(2);
          expect(updatedBoard.title).toBe(updateData.title);
          // ValidationPipe의 transform으로 인해 누락된 필드가 undefined로 설정될 수 있음
          expect(updatedBoard).toHaveProperty('content');
        });
    });

    it('should return empty object for non-existent board', () => {
      const updateData: UpdateBoardDto = {
        title: '존재하지 않는 게시글 수정',
      };

      return request(app.getHttpServer())
        .put('/board/999')
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({});
        });
    });

    it('should return 400 for invalid id format', () => {
      const updateData: UpdateBoardDto = {
        title: '유효하지 않은 ID',
      };

      return request(app.getHttpServer())
        .put('/board/invalid')
        .send(updateData)
        .expect(400);
    });
  });

  describe('/board/:id (DELETE)', () => {
    it('should delete an existing board', () => {
      return request(app.getHttpServer())
        .delete('/board/3')
        .expect(200)
        .expect((res) => {
          const deletedBoard = res.body as BoardEntity;
          expect(deletedBoard).toHaveProperty('id', 3);
          expect(deletedBoard).toHaveProperty('title');
          expect(deletedBoard).toHaveProperty('content');
        });
    });

    it('should return empty object for non-existent board', () => {
      return request(app.getHttpServer())
        .delete('/board/999')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({});
        });
    });

    it('should return 400 for invalid id format', () => {
      return request(app.getHttpServer()).delete('/board/invalid').expect(400);
    });
  });
});
