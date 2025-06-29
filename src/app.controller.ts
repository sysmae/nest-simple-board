import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    this.logger.log(`IP Address: ${ip}`);
    // this.logger.log(`Environment: ${this.configService.get('ENVIRONMENT')}`);

    console.log(`IP Address: ${ip}`);
    console.log(`Environment: ${this.configService.get('ENVIRONMENT')}`);
    return this.appService.getHello();

    // Exception 예제: NotFoundException
    // throw new NotFoundException('This route is not implemented yet.');
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
