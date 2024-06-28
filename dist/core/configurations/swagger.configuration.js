"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfiguration = void 0;
const swagger_1 = require("@nestjs/swagger");
function swaggerConfiguration(app, version, host, stage) {
    const dest = stage === 'prod'
        ? 'Production'
        : stage === 'stg'
            ? 'Staging'
            : 'Developement';
    const swaggerDocumentBuilder = new swagger_1.DocumentBuilder()
        .setTitle('API LuizaLabs')
        .setDescription('API LuizaLabs - Desafio Técnico')
        .setVersion(version)
        .addServer(`${host}/api`, dest)
        .setContact('', '', '')
        .addBearerAuth()
        .build();
    const swaggerDocumentOptions = {
        operationIdFactory: (_controllerKey, methodKey) => methodKey,
    };
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerDocumentBuilder, swaggerDocumentOptions);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
}
exports.swaggerConfiguration = swaggerConfiguration;
//# sourceMappingURL=swagger.configuration.js.map