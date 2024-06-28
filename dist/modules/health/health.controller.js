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
exports.HealthController = void 0;
const env_configuration_1 = require("../../core/configurations/env.configuration");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const fs = require("fs-extra");
const path = require("path");
const health_response_dto_1 = require("./dtos/health-response.dto");
let HealthController = class HealthController {
    constructor(health, http) {
        this.health = health;
        this.http = http;
    }
    check() {
        const { host } = (0, env_configuration_1.configuration)().api;
        return this.health.check([
            () => this.http.pingCheck('nestjs-swagger', `${host}/api`),
        ]);
    }
    async checkUsersEntity() {
        const filePath = path.resolve(__dirname, '../../../data/users/users.json');
        const healthResponse = new health_response_dto_1.HealthCheckDTO();
        try {
            const exists = await fs.pathExists(filePath);
            if (!exists) {
                healthResponse.status = 'nok';
                healthResponse.error = { message: 'File not found' };
                return healthResponse;
            }
            healthResponse.status = 'ok';
            healthResponse.message = 'File found';
            return healthResponse;
        }
        catch (error) {
            console.error('Erro ao verificar arquivo users.json:', error.message);
            throw new Error('Erro no health check');
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('api'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('users-entity'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkUsersEntity", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('HealthCheck'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.HttpHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map