"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerErrorResponse = exports.WithBasePostPutResponse = exports.WithBaseGetResponse = exports.SwaggerCreateResponse = exports.SwaggerResponse = exports.SwaggerMeta = exports.SwaggerPagination = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SwaggerPagination {
}
exports.SwaggerPagination = SwaggerPagination;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 1, description: 'Current Page' }),
    __metadata("design:type", Number)
], SwaggerPagination.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 10,
        description: 'Quantity of items per page',
    }),
    __metadata("design:type", Number)
], SwaggerPagination.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 100,
        description: 'Total of items',
    }),
    __metadata("design:type", Number)
], SwaggerPagination.prototype, "totalResultRows", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 10,
        description: 'Total of pages',
    }),
    __metadata("design:type", Number)
], SwaggerPagination.prototype, "totalPages", void 0);
class SwaggerMeta {
}
exports.SwaggerMeta = SwaggerMeta;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SwaggerPagination }),
    __metadata("design:type", SwaggerPagination)
], SwaggerMeta.prototype, "pagination", void 0);
class SwaggerResponse {
}
exports.SwaggerResponse = SwaggerResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Object }),
    __metadata("design:type", Object)
], SwaggerResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SwaggerMeta }),
    __metadata("design:type", SwaggerMeta)
], SwaggerResponse.prototype, "meta", void 0);
class SwaggerCreateResponse {
}
exports.SwaggerCreateResponse = SwaggerCreateResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: () => ({}) }),
    __metadata("design:type", Object)
], SwaggerCreateResponse.prototype, "data", void 0);
function WithBaseGetResponse(Base, options) {
    class ResponseDTO {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            isArray: true,
            type: Base,
            ...options,
        }),
        (0, class_transformer_1.Type)(() => Base),
        (0, class_validator_1.ValidateNested)({ each: true }),
        __metadata("design:type", void 0)
    ], ResponseDTO.prototype, "data", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false, type: SwaggerMeta }),
        (0, class_validator_1.ValidateNested)({ each: true }),
        __metadata("design:type", SwaggerMeta)
    ], ResponseDTO.prototype, "meta", void 0);
    return (0, common_1.mixin)(ResponseDTO);
}
exports.WithBaseGetResponse = WithBaseGetResponse;
function WithBasePostPutResponse(Base, options, isArray = false) {
    class ResponseDTO {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            isArray,
            type: Base,
            ...options,
        }),
        (0, class_transformer_1.Type)(() => Base),
        (0, class_validator_1.ValidateNested)({ each: true }),
        __metadata("design:type", void 0)
    ], ResponseDTO.prototype, "data", void 0);
    return (0, common_1.mixin)(ResponseDTO);
}
exports.WithBasePostPutResponse = WithBasePostPutResponse;
class SwaggerErrorResponse {
    constructor() {
        this.isSuccess = false;
        this.isFailure = true;
        this.statusCode = 400;
        this._value = null;
    }
}
exports.SwaggerErrorResponse = SwaggerErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Object)
], SwaggerErrorResponse.prototype, "isSuccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Object)
], SwaggerErrorResponse.prototype, "isFailure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", Object)
], SwaggerErrorResponse.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, default: 400 }),
    __metadata("design:type", Object)
], SwaggerErrorResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String, default: null }),
    __metadata("design:type", Object)
], SwaggerErrorResponse.prototype, "_value", void 0);
//# sourceMappingURL=swagger.dto.js.map