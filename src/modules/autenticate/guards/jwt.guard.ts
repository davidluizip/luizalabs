import { Result } from '@base/results-api.base';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { APIMESSAGE } from '@shared/services/api-message.helpers';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
  handleRequest(err, user) {
    if (err || !user) {
      throw new HttpException(
        Result.Fail(
          'JwtAuthGuard',
          APIMESSAGE.UNAUTHORIZED(),
          HttpStatus.UNAUTHORIZED,
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
