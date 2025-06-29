import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // DTO에 정의되지 않은 속성 제거 비활성화
      forbidNonWhitelisted: false, // DTO에 정의되지 않은 속성이 있어도 허용
      transform: true, // 자동으로 타입 변환
      skipMissingProperties: true, // 누락된 속성에 대한 검증 건너뛰기
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Simple Board API')
    .setDescription('간단한 게시판 API 문서')
    .setVersion('1.0')
    .addTag('Board', '게시글 관련 API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
