import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';
    const startTime = Date.now();

    this.logger.log(
      `[${new Date().toISOString()}] ${method} ${url} - IP: ${ip}`,
    );

    // Response 종료 시 실행시간 로깅
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      this.logger.log(
        `[${new Date().toISOString()}] ${method} ${url} - IP: ${ip} - ${duration}ms`,
      );
    });

    // Call the next middleware or route handler
    next();
  }
}
