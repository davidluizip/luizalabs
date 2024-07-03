import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDTO {
  @ApiProperty({
    required: false,
    description: 'Id do produto.',
  })
  product_id: string;

  @ApiProperty({
    required: false,
    description: 'Valor do produto.',
  })
  value: number;

  constructor(obj: any) {
    this.product_id = obj?.product_id;
    this.value = obj?.value;
  }
}
