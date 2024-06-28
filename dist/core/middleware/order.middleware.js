"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMiddleware = void 0;
class OrderMiddleware {
    use(req, res, next) {
        const order_field = req.query.orderBy;
        if (order_field) {
            const order = {};
            order[order_field] = null;
            let order_type = req.query.sort;
            if (!order_type) {
                order_type = 'asc';
            }
            order[order_field] = order_type;
            req.order = order;
        }
        else {
            const order = {};
            order['id'] = 'asc';
            req.order = order;
        }
        next();
    }
}
exports.OrderMiddleware = OrderMiddleware;
//# sourceMappingURL=order.middleware.js.map