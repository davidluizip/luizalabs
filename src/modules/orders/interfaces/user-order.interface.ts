import { IOrderDTO } from './order.interface';

export interface IUserOrderDTO {
  user_id: string;
  name: string;
  orders: IOrderDTO[];
}
