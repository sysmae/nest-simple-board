import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Ip = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.ip || request.connection?.remoteAddress || '';
  },
);
