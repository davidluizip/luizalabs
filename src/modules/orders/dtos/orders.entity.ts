import { IsCurrency, IsString } from 'class-validator';

export class OrdersEntity {
  @IsString()
  userId: string;

  @IsString()
  userName: string;

  @IsString()
  orderId: string;

  @IsString()
  prodId: string;

  @IsCurrency()
  value: number;

  @IsString()
  date: number;
}
