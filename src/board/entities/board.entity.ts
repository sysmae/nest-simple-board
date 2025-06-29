import { ApiProperty } from '@nestjs/swagger';

export class BoardEntity {
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글의 상세 내용입니다.',
  })
  content: string;
}
