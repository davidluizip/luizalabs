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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const api_message_helpers_1 = require("../../shared/services/api-message.helpers");
const decorators_1 = require("../decorators");
const profile_user_enum_1 = require("../enums/profile-user.enum");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(RolesGuard_1.name);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.get(decorators_1.ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            this.logger.error(`permission not set for route ${request.route.path}`);
            return false;
        }
        return this.validateRequest(request, requiredRoles);
    }
    validateRequest(req, requiredRoles) {
        try {
            const role = req.user['roles'];
            if (Array.isArray(requiredRoles) &&
                requiredRoles.length > 0 &&
                (requiredRoles.includes(profile_user_enum_1.ProfileUserEnum.PUBLIC) ||
                    role.is_admin ||
                    this.matchRoles(requiredRoles, role.name))) {
                return true;
            }
            throw new common_1.UnauthorizedException(api_message_helpers_1.APIMESSAGE.NOTPERMISSION());
        }
        catch (error) {
            throw new common_1.BadRequestException(api_message_helpers_1.APIMESSAGE.JWTNONCOMPLIANT());
        }
    }
    matchRoles(roles, userRole) {
        return roles.some((role) => role === userRole);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = RolesGuard_1 = __decorate([
    __param(0, (0, common_1.Inject)(core_1.Reflector)),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map