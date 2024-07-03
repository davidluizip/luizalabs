import { IsDateRange } from '@decorators/validate-date.decorator';
import { PaginationRequestDTO } from '@dto/pagination-request.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetllParamsDTO extends PaginationRequestDTO {
  @ApiProperty({
    required: false,
    example: '4509.202',
    description: 'Sku do produto.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    required: false,
    example: 'Deca',
    description: 'Nome da Empresa.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  prodId?: string;

  @ApiProperty({
    required: false,
    example: 'Deca',
    description: 'Nome da Empresa.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dateStart?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dateEnd?: string;

  @IsDateRange({
    message: 'Both dateStart and dateEnd must be provided together.',
  })
  @ApiHideProperty()
  validateDateRange: boolean;

  constructor(obj: any) {
    super();
    this.prodId = obj?.prodId;
    this.userId = obj?.userId;
    this.dateStart = obj?.dateStart;
    this.dateEnd = obj?.dateEnd;
  }
}
