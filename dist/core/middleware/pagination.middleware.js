"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationMiddleware = void 0;
class PaginationMiddleware {
    use(req, res, next) {
        let page = Number(req.query.page);
        if (page || page == 0) {
            const pagination = {};
            if (page < 1) {
                page = 0;
            }
            pagination.page = page;
            let limit = Number(req.query.limit);
            if (!limit) {
                limit = 10;
            }
            pagination.limit = limit;
            req.pagination = pagination;
        }
        else {
            const pagination = {};
            pagination.page = 0;
            pagination.limit = 10;
            req.pagination = pagination;
        }
        return next();
    }
}
exports.PaginationMiddleware = PaginationMiddleware;
//# sourceMappingURL=pagination.middleware.js.map