import { IProductDTO } from './product.interface';

export interface IOrderDTO {
  order_id: string;
  total: number;
  date: string;
  products: IProductDTO[];
}
