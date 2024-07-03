import { Module } from '@nestjs/common';
import { FileService } from '@shared/services/file.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { GetAllUseCase } from './use-cases/getall.usecase';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FileService, GetAllUseCase],
})
export class OrdersModule {}
