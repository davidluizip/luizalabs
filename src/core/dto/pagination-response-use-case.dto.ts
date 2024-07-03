import { OrderByParamsDTO } from './order-by.dto';
import { PaginationRequestDTO } from './pagination-request.dto';

export class PaginationResponseDTO<T> {
  filter: T;
  order: OrderByParamsDTO<T>;
  pagination: PaginationRequestDTO;
}
