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
exports.validate = exports.configuration = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const envs_dto_1 = require("../dto/envs.dto");
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    api: {
        port: parseInt(process.env.API_PORT, 10) || 3000,
        host: process.env.API_HOST,
        jwt: {
            secret: process.env.API_SECRET_API,
        },
    },
    routes: {
        productsImports: {
            url: process.env.PRODUCT_IMPORT_URL,
            secret: process.env.PRODUCT_IMPORT_SECRET,
        },
    },
});
exports.configuration = configuration;
var Environment;
(function (Environment) {
    Environment["Local"] = "local";
    Environment["Development"] = "dev";
    Environment["Production"] = "prod";
    Environment["Test"] = "stg";
})(Environment || (Environment = {}));
class EnvironmentVariables {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => envs_dto_1.APIDTO),
    __metadata("design:type", envs_dto_1.APIDTO)
], EnvironmentVariables.prototype, "api", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => envs_dto_1.CACHEDTO),
    __metadata("design:type", envs_dto_1.CACHEDTO)
], EnvironmentVariables.prototype, "cache", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => envs_dto_1.SALESFORCEDTO),
    __metadata("design:type", envs_dto_1.SALESFORCEDTO)
], EnvironmentVariables.prototype, "salesForce", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Environment),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
const validate = (config) => {
    const validatedConfig = (0, class_transformer_1.plainToClass)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        const [error] = errors;
        new common_1.Logger().error(JSON.stringify(error?.constraints));
        throw 'Variáveis definidas incorretas';
    }
    return validatedConfig;
};
exports.validate = validate;
//# sourceMappingURL=env.configuration.js.map