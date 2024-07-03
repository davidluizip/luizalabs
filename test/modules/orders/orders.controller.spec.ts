import { OrdersController } from '@modules/orders/orders.controller';
import { OrdersService } from '@modules/orders/orders.service';
import { GetAllUseCase } from '@modules/orders/use-cases/getall.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '@shared/services/file.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, FileService, GetAllUseCase],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
