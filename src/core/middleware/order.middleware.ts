import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { OrderByParamsDTO } from '../dto/order-by.dto';

export class OrderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const order_field = req.query.orderBy as string;
    if (order_field) {
      const order: OrderByParamsDTO<any> = {};

      order[order_field] = null;

      let order_type: any = req.query.sort as any;

      if (!order_type) {
        order_type = 'asc';
      }

      order[order_field] = order_type;

      req.order = order;
    } else {
      const order: OrderByParamsDTO<any> = {};

      order['id'] = 'asc';

      req.order = order;
    }

    next();
  }
}
