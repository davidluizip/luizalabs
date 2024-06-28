import { ApiProperty } from '@nestjs/swagger';

export class PaginationRequestDTO {
  @ApiProperty({
    type: 'number',
    description: 'numéro da página a ser consultada',
    required: false,
  })
  page: number;

  @ApiProperty({
    type: 'number',
    description: 'Limite de registros por página a ser consultada',
    required: false,
  })
  limit: number;
}
