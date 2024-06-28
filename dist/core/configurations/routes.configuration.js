"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTERS = void 0;
const autenticate_module_1 = require("../../modules/autenticate/autenticate.module");
const health_module_1 = require("../../modules/health/health.module");
exports.ROUTERS = [
    {
        path: 'healthcheck',
        module: health_module_1.HealthModule,
    },
    {
        path: 'auth',
        module: autenticate_module_1.AutenticateModule,
    },
];
//# sourceMappingURL=routes.configuration.js.map