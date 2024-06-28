"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_configuration_1 = require("./core/configurations/env.configuration");
const swagger_configuration_1 = require("./core/configurations/swagger.configuration");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const compression = require("compression");
const logging_interceptor_1 = require("./core/interceptor/logging.interceptor");
const express_1 = require("express");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./core/interceptor/transform.interceptor");
const ENV = (0, env_configuration_1.configuration)().api;
const NODE_ENV = (0, env_configuration_1.configuration)().NODE_ENV;
BigInt.prototype.toJSON = function () {
    return this.toString();
};
async function bootstrap() {
    const isProduction = process.env.NODE_ENV === 'prod';
    const logLevels = isProduction
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'];
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logLevels,
    });
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggerInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: ['1'],
    });
    (0, swagger_configuration_1.swaggerConfiguration)(app, '1.0', ENV.host, NODE_ENV);
    app.setGlobalPrefix('api', { exclude: ['healthcheck'] });
    app.enableShutdownHooks();
    app.use(compression());
    app.use((0, express_1.json)({ limit: '10mb' }));
    await app.listen(ENV.port || 3000);
    common_1.Logger.log(`Built for environment ${NODE_ENV}`, 'Main');
    common_1.Logger.log(`Server Host at ${ENV.host}`, 'Main');
}
bootstrap();
//# sourceMappingURL=main.js.map