"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfiguration = void 0;
function corsConfiguration(app) {
    const corsOptions = {
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'X-Requested-With',
            'Authorization',
            'Accept',
            'Content-Type',
            'x-micro-key',
        ],
        optionsSuccessStatus: 204,
        preflightContinue: false,
    };
    app.enableCors(corsOptions);
}
exports.corsConfiguration = corsConfiguration;
//# sourceMappingURL=cors.configuration.js.map