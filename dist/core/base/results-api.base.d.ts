import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'core/interceptor/transform.interceptor';
export interface ResponseMicro<T> {
    data: T;
    meta: any;
}
export declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: any;
    statusCode: HttpStatus;
    private _value;
    private constructor();
    getValue(): IResponse<T>;
    static Ok<U>(value?: IResponse<U>): Result<U>;
    static Fail<U>(origin: string, error: any, statusCode?: HttpStatus): Result<U>;
    static Combine(results: Result<any>[]): Result<any>;
    private handlerError;
}
