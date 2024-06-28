"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const configurations_module_1 = require("./core/configurations/configurations.module");
const routes_configuration_1 = require("./core/configurations/routes.configuration");
const filter_middleware_1 = require("./core/middleware/filter.middleware");
const order_middleware_1 = require("./core/middleware/order.middleware");
const pagination_middleware_1 = require("./core/middleware/pagination.middleware");
const autenticate_module_1 = require("./modules/autenticate/autenticate.module");
const health_module_1 = require("./modules/health/health.module");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const import_files_module_1 = require("./modules/import-files/import-files.module");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(filter_middleware_1.FilterMiddleware, order_middleware_1.OrderMiddleware, pagination_middleware_1.PaginationMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.GET });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configurations_module_1.ConfigurationsModule,
            health_module_1.HealthModule,
            core_1.RouterModule.register(routes_configuration_1.ROUTERS),
            autenticate_module_1.AutenticateModule,
            import_files_module_1.ImportFilesModule,
            users_module_1.UsersModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map