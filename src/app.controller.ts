import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 쿼리 파라미터 사용하는 예제
  @Get('name')
  getName(@Query('name') name: string): string {
    return `Hello, ${name || 'Guest'}!`;
  }

  // URL 파라미터를 사용하는 예제
  @Get('name/:name')
  getNameByParam(@Param('name') name: string): string {
    return `Hello, ${name}!`;
  }
}
