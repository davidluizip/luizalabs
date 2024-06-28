"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMiddleware = void 0;
class FilterMiddleware {
    use(req, res, next) {
        const reservedWord = [
            'orderBy',
            'sort',
            'page',
            'per_page',
            'limit',
            'offset',
        ];
        const filters = {};
        for (const key in req.query) {
            if (!reservedWord.includes(key) && req.query[key] !== '') {
                filters[key] = req.query[key];
            }
        }
        req.filters = filters;
        next();
    }
}
exports.FilterMiddleware = FilterMiddleware;
//# sourceMappingURL=filter.middleware.js.map