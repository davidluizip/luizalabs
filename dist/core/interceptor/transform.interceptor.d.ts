import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
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
export declare class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>>;
}
