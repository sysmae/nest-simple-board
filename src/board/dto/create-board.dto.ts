import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '새로운 게시글 제목',
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty({ message: '제목은 필수입니다.' })
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @MinLength(1, { message: '제목은 최소 1글자 이상이어야 합니다.' })
  @MaxLength(100, { message: '제목은 최대 100글자까지 가능합니다.' })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글의 상세 내용입니다.',
    minLength: 1,
    maxLength: 1000,
    required: true,
  })
  @IsNotEmpty({ message: '내용은 필수입니다.' })
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @MinLength(1, { message: '내용은 최소 1글자 이상이어야 합니다.' })
  @MaxLength(1000, { message: '내용은 최대 1000글자까지 가능합니다.' })
  content: string;
}
