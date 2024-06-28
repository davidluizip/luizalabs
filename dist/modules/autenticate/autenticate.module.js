"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticateModule = void 0;
const users_service_1 = require("../users/users.service");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const autenticate_controller_1 = require("./autenticate.controller");
const autenticate_service_1 = require("./autenticate.service");
const jwt_strategy_1 = require("./guards/jwt.strategy");
let AutenticateModule = class AutenticateModule {
};
exports.AutenticateModule = AutenticateModule;
exports.AutenticateModule = AutenticateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            axios_1.HttpModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    secret: configService.get('api.jwt.secret'),
                    signOptions: { expiresIn: '60m' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [autenticate_controller_1.AutenticateController],
        providers: [jwt_strategy_1.JwtStrategy, autenticate_service_1.AutenticateService, users_service_1.UsersService],
    })
], AutenticateModule);
//# sourceMappingURL=autenticate.module.js.map