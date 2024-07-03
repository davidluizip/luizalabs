import { Result } from '@base/results-api.base';
import { Injectable } from '@nestjs/common';
import { IFindAllParams } from '@shared/interfaces/find-all-params.interface';
import { GetllParamsDTO } from './dtos/query/getall-query.dto';
import { IUserOrderDTO } from './interfaces/user-order.interface';
import { GetAllUseCase } from './use-cases/getall.usecase';

@Injectable()
export class OrdersService {
  constructor(private readonly getAllUseCase: GetAllUseCase) {}

  /**
   * Método para obter pedidos aplicando paginação e filtros.
   * @param pagination - Parâmetros de paginação (page, limit).
   * @param filters - Filtros opcionais para userId, prodId, dateStart e dateEnd.
   * @returns Promise<Result<IUserOrderDTO[]>> - Resultado contendo os pedidos de usuários.
   */
  async getOrders({
    pagination,
    filters,
  }: IFindAllParams<GetllParamsDTO>): Promise<Result<IUserOrderDTO[]>> {
    return this.getAllUseCase.run({ pagination, filters });
  }
}
