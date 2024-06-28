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
exports.AutenticateService = void 0;
const results_api_base_1 = require("../../core/base/results-api.base");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const api_message_helpers_1 = require("../../shared/services/api-message.helpers");
const user_validate_service_1 = require("../../shared/services/user-validate.service");
let AutenticateService = class AutenticateService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn({ username, password, }) {
        try {
            const user = await this.usersService.findOne(username);
            user_validate_service_1.UserValidateService.userName(user, username).password(user, password);
            const payload = { sub: user.userId, username: user.username };
            const access_token = await this.jwtService.signAsync(payload);
            return results_api_base_1.Result.Ok({
                data: { access_token },
                meta: null,
            });
        }
        catch (error) {
            let message = api_message_helpers_1.APIMESSAGE.JWTERROR();
            if (error?.message && typeof api_message_helpers_1.APIMESSAGE[error.message] === 'function') {
                message = api_message_helpers_1.APIMESSAGE[error.message]();
            }
            return results_api_base_1.Result.Fail(`AutenticateService-signIn`, message, 500);
        }
    }
};
exports.AutenticateService = AutenticateService;
exports.AutenticateService = AutenticateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AutenticateService);
//# sourceMappingURL=autenticate.service.js.map