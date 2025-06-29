import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardService {
  private boards: BoardEntity[] = [
    {
      id: 1,
      title: '첫 번째 게시글',
      content: '이것은 첫 번째 게시글의 내용입니다.',
    },
    {
      id: 2,
      title: '두 번째 게시글',
      content: '두 번째 게시글을 작성해봅니다.',
    },
    {
      id: 3,
      title: '질문 있습니다',
      content: 'NestJS에서 서비스 주입이 궁금합니다.',
    },
    {
      id: 4,
      title: '공유합니다',
      content: '유용한 자료를 공유합니다.',
    },
    {
      id: 5,
      title: '가입 인사드립니다',
      content: '안녕하세요! 잘 부탁드립니다.',
    },
    {
      id: 6,
      title: '이벤트 안내',
      content: '이벤트가 곧 시작됩니다.',
    },
    {
      id: 7,
      title: '건의사항',
      content: '사이트에 다크모드가 있었으면 좋겠습니다.',
    },
    {
      id: 8,
      title: '오늘의 유머',
      content: '재미있는 이야기를 공유합니다.',
    },
    {
      id: 9,
      title: '스터디 모집',
      content: '함께 공부할 분을 모집합니다.',
    },
    {
      id: 10,
      title: 'Q&A',
      content: '질문과 답변을 자유롭게 남겨주세요.',
    },
  ];

  findAll(): BoardEntity[] {
    return this.boards;
  }

  find(id: number): BoardEntity | undefined {
    return this.boards.find((board) => board.id === id);
  }

  getNextId(): number {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }

  getBoardIndex(id: number): number {
    return this.boards.findIndex((board) => board.id === id);
  }

  create(data: CreateBoardDto): BoardEntity {
    const newBoard: BoardEntity = {
      id: this.getNextId(),
      ...data,
    };
    this.boards.push(newBoard);
    return newBoard;
  }
  update(id: number, data: UpdateBoardDto): BoardEntity | null {
    const index = this.getBoardIndex(id);
    if (index === -1) {
      return null;
    }

    // undefined 값들을 제거하여 부분 업데이트 구현
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );

    this.boards[index] = { ...this.boards[index], ...filteredData };
    return this.boards[index];
  }

  delete(id: number): BoardEntity | null {
    const index = this.getBoardIndex(id);
    if (index === -1) {
      return null;
    }
    const deletedBoard = this.boards.splice(index, 1);
    return deletedBoard[0];
  }
}
