import { IsDateRange } from '@decorators/validate-date.decorator';
import { PaginationRequestDTO } from '@dto/pagination-request.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetllParamsDTO extends PaginationRequestDTO {
  @ApiProperty({
    required: false,
    description: 'Id do usuário.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    required: false,
    description: 'Id do produto.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  prodId?: string;

  @ApiProperty({
    required: false,
    description: 'Data de início.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dateStart?: string;

  @ApiProperty({
    required: false,
    description: 'Data de fim.',
  })
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
