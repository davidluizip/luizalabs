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
exports.Limit = exports.LimitGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const results_api_base_1 = require("../base/results-api.base");
let LimitGuard = class LimitGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const limit = this.reflector.get('limit', context.getHandler());
        const size = request.socket.bytesRead;
        if (size > limit) {
            throw results_api_base_1.Result.Fail('Request Entity Too Large Error', 413).getValue();
        }
        return limit > request.socket.bytesRead;
    }
};
exports.LimitGuard = LimitGuard;
exports.LimitGuard = LimitGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], LimitGuard);
const Limit = (limit) => (0, common_1.applyDecorators)((0, common_1.UseGuards)(LimitGuard), (0, common_1.SetMetadata)('limit', limit));
exports.Limit = Limit;
//# sourceMappingURL=limit-body.guard.js.map