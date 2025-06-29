import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '수정된 게시글 제목',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '수정된 게시글 내용입니다.',
    required: false,
  })
  content?: string;
}
