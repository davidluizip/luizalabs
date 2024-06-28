import { Result } from '@base/results-api.base';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { APIMESSAGE } from '@shared/services/api-message.helpers';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt', 'x-micro-key']) {
  handleRequest(err, user) {
    if (err || !user) {
      throw new HttpException(
        Result.Fail(APIMESSAGE.BFFAUTHORIZATION(), HttpStatus.UNAUTHORIZED),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
