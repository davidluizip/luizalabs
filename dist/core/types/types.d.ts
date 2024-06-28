import { HttpStatus } from '@nestjs/common';
export type TResult = {
    _value: any;
    isSuccess: boolean;
    isFailure: boolean;
    error: string;
    statusCode?: HttpStatus;
};
export type PaginationData = {
    page?: number;
    limit?: number;
};
export type Paginated<T> = {
    data: T[];
    totalPages: number;
    total: number;
} & PaginationData;
export type ProxyFunctions = {
    findMany: (params: unknown, pagination: PaginationData) => Promise<any>;
    count: (params: unknown) => Promise<number>;
};
type Operator<T> = {
    and?: WhereOptions<T>[];
    or?: WhereOptions<T>[];
    not?: null;
};
export type WhereOptions<T> = {
    [K in keyof T]?: T[K] | Operator<T[K]>;
};
export type SelectOptions<T> = {
    [K in keyof T]?: false | true;
};
export type OrdeByOptions<T> = {
    [K in keyof T]?: 'asc' | 'desc';
};
export {};
