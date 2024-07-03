import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductResponseDTO } from './product-response.dto';

export class OrderResponseDTO {
  @ApiProperty({
    required: false,
    description: 'Id do pedido.',
  })
  order_id: string;

  @ApiProperty({
    required: false,
    description: 'Total do pedido.',
  })
  total: number;

  @ApiProperty({
    required: false,
    description: 'Data do pedido.',
  })
  date: string;

  @ApiProperty({
    required: false,
    description: 'Produtos do pedido.',
    isArray: true,
    type: ProductResponseDTO,
  })
  @Type(() => OrderResponseDTO)
  products: ProductResponseDTO[];
}
