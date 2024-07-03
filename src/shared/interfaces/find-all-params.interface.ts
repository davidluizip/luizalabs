import { IUserSession } from '@interfaces/user-response.interface';
import { OrderByParamsDTO } from 'core/dto/order-by.dto';
import { PaginationRequestDTO } from 'core/dto/pagination-request.dto';

export interface IFindAllParams<P> {
  filters: P;
  pagination: PaginationRequestDTO;
  orderBy?: OrderByParamsDTO<P>;
  user?: IUserSession;
}
