"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSession = exports.ValidParams = void 0;
const results_api_base_1 = require("../base/results-api.base");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
exports.ValidParams = (0, common_1.createParamDecorator)(async (dto, ctx) => {
    try {
        const { filters, pagination, order, user } = ctx
            .switchToHttp()
            .getRequest();
        if (dto) {
            const dtoInstance = new dto(filters);
            const _filters = removeUndefinedProperties(dtoInstance);
            const filtersDTO = (0, class_transformer_1.plainToClass)(dto, _filters);
            const errors = await (0, class_validator_1.validate)(filtersDTO);
            if (errors.length > 0) {
                const response = ctx.switchToHttp().getResponse();
                response.setHeader('Content-Type', 'application/json');
                response.status(422).json(results_api_base_1.Result.Fail('ValidParams:', errors, 422));
                return null;
            }
            return {
                pagination,
                orderBy: order,
                filters: removeUndefinedProperties(filtersDTO),
                user,
            };
        }
        return {
            pagination,
            orderBy: order,
            filters: null,
            user,
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetUserSession = (0, common_1.createParamDecorator)(async (data, ctx) => {
    try {
        const { user } = ctx.switchToHttp().getRequest();
        if (!user?.userId) {
            const response = ctx.switchToHttp().getResponse();
            response.setHeader('Content-Type', 'application/json');
            response.status(422).json(results_api_base_1.Result.Fail('Invalid Session', 400));
            return null;
        }
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
const removeUndefinedProperties = (obj) => {
    const cleanedObj = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined) {
            cleanedObj[key] = value;
        }
    });
    return cleanedObj;
};
//# sourceMappingURL=validate-filters.decorator.js.map