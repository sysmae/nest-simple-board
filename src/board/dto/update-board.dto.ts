import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '수정된 게시글 제목',
    required: false,
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @MinLength(1, { message: '제목은 최소 1글자 이상이어야 합니다.' })
  @MaxLength(100, { message: '제목은 최대 100글자까지 가능합니다.' })
  title?: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '수정된 게시글 내용입니다.',
    required: false,
    minLength: 1,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @MinLength(1, { message: '내용은 최소 1글자 이상이어야 합니다.' })
  @MaxLength(1000, { message: '내용은 최대 1000글자까지 가능합니다.' })
  content?: string;
}
