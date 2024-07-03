import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderResponseDTO } from './order-response.dto';

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
    isArray: true,
    type: OrderResponseDTO,
  })
  @Type(() => OrderResponseDTO)
  orders: OrderResponseDTO[];

  constructor(obj: any) {
    this.user_id = obj?.user_id;
    this.name = obj?.name;
    this.orders = obj?.orders;
  }
}
