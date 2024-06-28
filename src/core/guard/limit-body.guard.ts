import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Result } from 'core/base/results-api.base';

@Injectable()
export class LimitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const limit = this.reflector.get<string>('limit', context.getHandler());
    const size = request.socket.bytesRead;
    if (size > limit) {
      throw Result.Fail('Request Entity Too Large Error', 413).getValue();
    }
    return limit > request.socket.bytesRead;
  }
}

export const Limit = (limit: number) =>
  applyDecorators(UseGuards(LimitGuard), SetMetadata('limit', limit));
