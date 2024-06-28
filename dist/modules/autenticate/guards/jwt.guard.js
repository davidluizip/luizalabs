"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const results_api_base_1 = require("../../../core/base/results-api.base");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const api_message_helpers_1 = require("../../../shared/services/api-message.helpers");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)(['jwt', 'x-micro-key']) {
    handleRequest(err, user) {
        if (err || !user) {
            throw new common_1.HttpException(results_api_base_1.Result.Fail(api_message_helpers_1.APIMESSAGE.BFFAUTHORIZATION(), common_1.HttpStatus.UNAUTHORIZED), common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt.guard.js.map