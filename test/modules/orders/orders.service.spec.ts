import { OrdersService } from '@modules/orders/orders.service';
import { GetAllUseCase } from '@modules/orders/use-cases/getall.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '@shared/services/file.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, FileService, GetAllUseCase],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
