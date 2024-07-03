import { Result } from '@base/results-api.base';
import { Roles } from '@decorators/roles.decorator';
import {
  GetUserSession,
  ValidParams,
} from '@decorators/validate-filters.decorator';
import {
  SwaggerErrorResponse,
  WithBaseGetResponse,
} from '@dto/swagger/swagger.dto';
import { ProfileUserEnum } from '@enums/profile-user.enum';
import { RolesGuard } from '@guard/roles.guard';
import { IUserSession } from '@interfaces/user-response.interface';
import { JwtAuthGuard } from '@modules/autenticate/guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { IFindAllParams } from '@shared/interfaces/find-all-params.interface';
import { GetllParamsDTO } from './dtos/query/getall-query.dto';
import { GetAllResponseDTO } from './dtos/response/getall-response.dto';
import { OrdersService } from './orders.service';

@ApiSecurity('bearer')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(ProfileUserEnum.PUBLIC)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    type: WithBaseGetResponse(GetAllResponseDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  @ApiQuery({ type: GetllParamsDTO })
  getAll(
    @ValidParams(GetllParamsDTO)
    { pagination, orderBy, filters }: IFindAllParams<GetllParamsDTO>,
    @GetUserSession() user: IUserSession,
  ): Promise<Result<any>> {
    return this.ordersService.getOrders({ pagination, orderBy, filters, user });
  }
}
