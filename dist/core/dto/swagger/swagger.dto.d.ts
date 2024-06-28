import { ApiPropertyOptions } from '@nestjs/swagger';
export declare class SwaggerPagination {
    page: number;
    limit: number;
    totalResultRows: number;
    totalPages: number;
}
export declare class SwaggerMeta {
    pagination?: SwaggerPagination;
}
export declare class SwaggerResponse<T> {
    data: T extends T ? T : T[];
    meta?: SwaggerMeta;
}
export declare class SwaggerCreateResponse<T> {
    data: T;
}
type Constructor<T = object> = new (...args: any[]) => T;
export declare function WithBaseGetResponse<TBase extends Constructor>(Base: TBase, options?: ApiPropertyOptions | undefined): import("@nestjs/common").Type<{
    data: InstanceType<TBase>;
    meta?: SwaggerMeta;
}>;
export declare function WithBasePostPutResponse<TBase extends Constructor>(Base: TBase, options?: ApiPropertyOptions | undefined, isArray?: boolean): import("@nestjs/common").Type<{
    data: InstanceType<TBase>;
}>;
export declare class SwaggerErrorResponse {
    isSuccess: boolean;
    isFailure: boolean;
    error: any;
    statusCode: number;
    _value: any;
}
export {};
