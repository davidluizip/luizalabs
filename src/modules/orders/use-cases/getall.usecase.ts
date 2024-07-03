import { Result } from '@base/results-api.base';
import { UseCase } from '@base/use-case';
import { Injectable } from '@nestjs/common';
import { IFindAllParams } from '@shared/interfaces/find-all-params.interface';
import { FileService } from '@shared/services/file.service';
import { GetllParamsDTO } from '../dtos/query/getall-query.dto';
import { IUserOrderDTO } from '../interfaces/user-order.interface';
import { OrdersMappers } from '../mappers/orders.mapper';

export interface IGetAllUseCase {
  filePath: Buffer;
}

@Injectable()
export class GetAllUseCase implements UseCase<Result<IUserOrderDTO[]>> {
  constructor(private fileService: FileService) {}

  /**
   * Método Run para executar a lógica do caso de uso.
   * @param pagination - Contém informações de paginação (página e limite).
   * @param filters - Contém os filtros opcionais para userId, prodId, dateStart e dateEnd.
   * @returns Promise<Result<IUserOrderDTO[]>> - Uma promessa que resolve o resultado contendo os pedidos do usuário filtrados e paginados.
   */
  async run({
    pagination,
    filters,
  }: IFindAllParams<GetllParamsDTO>): Promise<Result<IUserOrderDTO[]>> {
    const orders = await this.fileService.getOrders();

    const result = OrdersMappers.mapRawDataToDTO(orders, filters);

    const total = result.length;

    const startIndex = (pagination.page - 1) * pagination.limit;

    const paginatedOrders = result.slice(
      startIndex,
      startIndex + pagination.limit,
    );

    return Result.Ok<IUserOrderDTO[]>({
      data: paginatedOrders,
      meta: {
        pagination: {
          totalResultRows: total,
          page: pagination.page,
          limit: pagination.limit,
        },
      },
    });
  }
}
