import { OrderByParamsDTO } from 'core/dto/order-by.dto';
import { PaginationRequestDTO } from 'core/dto/pagination-request.dto';
import {
  IUserResponse,
  IUserSessionBase,
} from 'core/interfaces/user-response.interface';

export interface IFindAllRequest<P> {
  filters: P;
  pagination: PaginationRequestDTO;
  orderBy?: OrderByParamsDTO<P>;
}
export interface IUserSession {
  user?: IUserResponse;
}

export interface IFindAllParams<P> {
  filters: P;
  pagination: PaginationRequestDTO;
  orderBy?: OrderByParamsDTO<P>;
  user?: IUserSessionBase;
}

export interface IFindAllParamsSync<P> extends IFindAllParams<P> {
  select: any;
  cacheName: string;
}

export interface ISessionApi {
  id: null;
  name: string;
  correlationId: string;
  user: IUserSessionBase;
  roles: IRoleSession;
  iat: number;
  exp: number;
}

interface IRoleSession {
  id: number;
  name: string;
  is_admin: boolean;
}

export interface IPayloadSession {
  userClient: IUserSessionBase;
  microName: string;
  correlationId: string;
  roles: IRoleSession;
}
