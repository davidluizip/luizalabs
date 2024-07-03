import { ConfigurationsModule } from '@configurations/configurations.module';
import { ROUTERS } from '@configurations/routes.configuration';
import { FilterMiddleware } from '@middleware/filter.middleware';
import { OrderMiddleware } from '@middleware/order.middleware';
import { PaginationMiddleware } from '@middleware/pagination.middleware';
import { AutenticateModule } from '@modules/autenticate/autenticate.module';
import { HealthModule } from '@modules/health/health.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ImportFilesModule } from './modules/import-files/import-files.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigurationsModule,
    HealthModule,
    RouterModule.register(ROUTERS),
    AutenticateModule,
    ImportFilesModule,
    UsersModule,
    EventEmitterModule.forRoot(),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FilterMiddleware, OrderMiddleware, PaginationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
