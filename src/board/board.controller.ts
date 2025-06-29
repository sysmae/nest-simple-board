import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '모든 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '모든 게시글 목록을 반환합니다.',
    type: [BoardEntity],
  })
  findAll() {
    return this.boardService.findAll();
  }

  @Get('next-id')
  @ApiOperation({ summary: '다음 게시글 ID 조회' })
  @ApiResponse({
    status: 200,
    description: '다음에 생성될 게시글의 ID를 반환합니다.',
    type: Number,
  })
  getNextId() {
    return { nextId: this.boardService.getNextId() };
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 게시글 조회' })
  @ApiParam({
    name: 'id',
    description: '게시글 ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '게시글 정보를 반환합니다.',
    type: BoardEntity,
  })
  @ApiResponse({
    status: 404,
    description: '게시글을 찾을 수 없습니다.',
  })
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.find(id);
  }

  @Post()
  @ApiOperation({ summary: '새 게시글 작성' })
  @ApiBody({ type: CreateBoardDto })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 생성되었습니다.',
    type: BoardEntity,
  })
  create(@Body() data: CreateBoardDto) {
    return this.boardService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({
    name: 'id',
    description: '수정할 게시글 ID',
    type: Number,
    example: 1,
  })
  @ApiBody({ type: UpdateBoardDto })
  @ApiResponse({
    status: 200,
    description: '게시글이 성공적으로 수정되었습니다.',
    type: BoardEntity,
  })
  @ApiResponse({
    status: 404,
    description: '게시글을 찾을 수 없습니다.',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBoardDto) {
    return this.boardService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({
    name: 'id',
    description: '삭제할 게시글 ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '게시글이 성공적으로 삭제되었습니다.',
    type: BoardEntity,
  })
  @ApiResponse({
    status: 404,
    description: '게시글을 찾을 수 없습니다.',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(id);
  }
}
