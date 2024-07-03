import { parseDate } from '@shared/services/parser-date.helper';
import { GetllParamsDTO } from '../dtos/query/getall-query.dto';
import { IOrderDTO } from '../interfaces/order.interface';
import { IProductDTO } from '../interfaces/product.interface';
import { IRawData } from '../interfaces/rawdata.interface';
import { IUserOrderDTO } from '../interfaces/user-order.interface';

export class OrdersMappers {
  /**
   * Mapeia dados brutos para DTOs de pedidos de usuários, aplicando filtros opcionais.
   * @param rawData - Dados brutos de pedidos.
   * @param filters - Filtros opcionais para userId, prodId, dateStart e dateEnd.
   * @returns Array de IUserOrderDTO contendo os pedidos mapeados e filtrados.
   */
  static mapRawDataToDTO(
    rawData: IRawData[],
    filters: GetllParamsDTO,
  ): IUserOrderDTO[] {
    const usersMap = new Map<string, IUserOrderDTO>();

    rawData.forEach((data) => {
      if (this.applyFilters(data, filters)) {
        this.addToUsersMap(usersMap, data);
      }
    });

    return Array.from(usersMap.values());
  }

  /**
   * Aplica os filtros aos dados brutos.
   * @param data - Dados brutos de um pedido.
   * @param filters - Filtros opcionais para userId, prodId, dateStart e dateEnd.
   * @returns boolean indicando se os dados passam pelos filtros.
   */
  private static applyFilters(
    data: IRawData,
    filters: GetllParamsDTO,
  ): boolean {
    if (filters?.userId && data.userId !== filters.userId) {
      return false;
    }

    if (filters?.prodId && data.prodId !== filters.prodId) {
      return false;
    }

    if (filters?.dateStart && filters?.dateEnd) {
      const filterDateStart = parseDate(filters.dateStart);
      const filterDateEnd = parseDate(filters.dateEnd);
      const dataDate = parseDate(data.date);

      if (dataDate < filterDateStart || dataDate > filterDateEnd) {
        return false;
      }
    }

    return true;
  }

  /**
   * Adiciona os dados filtrados ao mapa de usuários.
   * @param usersMap - Mapa de usuários com seus pedidos.
   * @param data - Dados brutos de um pedido.
   */
  private static addToUsersMap(
    usersMap: Map<string, IUserOrderDTO>,
    data: IRawData,
  ): void {
    if (!usersMap.has(data.userId)) {
      usersMap.set(data.userId, this.createUserDTO(data));
    }

    const userDTO = usersMap.get(data.userId)!;

    if (!this.hasOrder(userDTO.orders, data.orderId)) {
      userDTO.orders.push(this.createOrderDTO(data));
    }

    const orderDTO = userDTO.orders.find(
      (order) => order.order_id === data.orderId,
    )!;

    if (!this.hasProduct(orderDTO.products, data.prodId)) {
      orderDTO.products.push(this.createProductDTO(data));
      orderDTO.total += data.value;
    }
  }

  /**
   * Cria um DTO de usuário a partir dos dados brutos.
   * @param data - Dados brutos de um pedido.
   * @returns IUserOrderDTO contendo os dados do usuário.
   */
  private static createUserDTO(data: IRawData): IUserOrderDTO {
    return {
      user_id: data.userId,
      name: data.userName,
      orders: [],
    };
  }

  /**
   * Cria um DTO de pedido a partir dos dados brutos.
   * @param data - Dados brutos de um pedido.
   * @returns IOrderDTO contendo os dados do pedido.
   */
  private static createOrderDTO(data: IRawData): IOrderDTO {
    return {
      order_id: data.orderId,
      total: 0,
      date: data.date,
      products: [],
    };
  }

  /**
   * Cria um DTO de produto a partir dos dados brutos.
   * @param data - Dados brutos de um pedido.
   * @returns IProductDTO contendo os dados do produto.
   */
  private static createProductDTO(data: IRawData): IProductDTO {
    return {
      product_id: data.prodId,
      value: data.value,
    };
  }

  /**
   * Verifica se um pedido já existe na lista de pedidos de um usuário.
   * @param orders - Lista de pedidos de um usuário.
   * @param orderId - ID do pedido a ser verificado.
   * @returns boolean indicando se o pedido já existe.
   */
  private static hasOrder(orders: IOrderDTO[], orderId: string): boolean {
    return orders.some((order) => order.order_id === orderId);
  }

  /**
   * Verifica se um produto já existe na lista de produtos de um pedido.
   * @param products - Lista de produtos de um pedido.
   * @param productId - ID do produto a ser verificado.
   * @returns boolean indicando se o produto já existe.
   */
  private static hasProduct(
    products: IProductDTO[],
    productId: string,
  ): boolean {
    return products.some((product) => product.product_id === productId);
  }
}
