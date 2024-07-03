import { IOrderDTO } from '@modules/orders/interfaces/order.interface';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllResponseDTO {
  @ApiProperty({
    required: false,
    description: 'Id do usuário.',
  })
  user_id: string;

  @ApiProperty({
    required: false,
    description: 'Nome do usuário.',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Pedidos do usuário',
  })
  orders: IOrderDTO[];

  constructor(obj: any) {
    this.user_id = obj?.user_id;
    this.name = obj?.name;
    this.orders = obj?.orders;
  }
}
