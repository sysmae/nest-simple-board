import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '새로운 게시글 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글의 상세 내용입니다.',
  })
  content: string;
}
