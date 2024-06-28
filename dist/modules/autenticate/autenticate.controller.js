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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticateController = void 0;
const swagger_dto_1 = require("../../core/dto/swagger/swagger.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const autenticate_service_1 = require("./autenticate.service");
const signin_request_dto_1 = require("./dto/request/signin.request.dto");
const auth_response_dto_1 = require("./dto/response/auth-response.dto");
let AutenticateController = class AutenticateController {
    constructor(autenticateService) {
        this.autenticateService = autenticateService;
    }
    signIn({ username, password }) {
        return this.autenticateService.signIn({ username, password });
    }
};
exports.AutenticateController = AutenticateController;
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: (0, swagger_dto_1.WithBasePostPutResponse)(auth_response_dto_1.AuthResponseDTO),
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: swagger_dto_1.SwaggerErrorResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_request_dto_1.SignInRequestDTO]),
    __metadata("design:returntype", Promise)
], AutenticateController.prototype, "signIn", null);
exports.AutenticateController = AutenticateController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Autenticate'),
    __metadata("design:paramtypes", [autenticate_service_1.AutenticateService])
], AutenticateController);
//# sourceMappingURL=autenticate.controller.js.map