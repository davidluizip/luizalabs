import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TResult } from '../types/types';

export interface IMeta {
  pagination?: IPagination;
}

export interface IPagination {
  page: number;
  limit: number;
  totalResultRows: number;
  totalPages: number;
}

export type IData<T> = T extends T ? T : T[];

export interface IResponse<T> {
  data: IData<T>;
  meta?: IMeta;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    //const http = context.switchToHttp();
    //const request = http.getRequest();
    //const res = http.getResponse();

    return next.handle().pipe(
      map((data: TResult) => {
        if (data?.isFailure) {
          throw new HttpException(data, data.statusCode);
        }
        if (data?.isSuccess)
          return {
            ...data?._value,
          };
        return data;
      }),
      catchError((error) => {
        if (error?.code === 'ERR_HTTP_HEADERS_SENT')
          return throwError(() => null);
        return throwError(() => error);
      }),
    );
  }
}
