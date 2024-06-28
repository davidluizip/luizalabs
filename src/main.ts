import { configuration } from '@configurations/env.configuration';
import { swaggerConfiguration } from '@configurations/swagger.configuration';
import {
  LogLevel,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { LoggerInterceptor } from 'core/interceptor/logging.interceptor';
import { json } from 'express';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

const ENV = configuration().api;
const NODE_ENV = configuration().NODE_ENV;

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'prod';
  const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'debug', 'verbose'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  swaggerConfiguration(app, '1.0', ENV.host, NODE_ENV);

  app.setGlobalPrefix('api', { exclude: ['healthcheck'] });

  app.enableShutdownHooks();

  app.use(compression());

  app.use(json({ limit: '10mb' }));

  await app.listen(ENV.port || 3000);

  Logger.log(`Built for environment ${NODE_ENV}`, 'Main');
  Logger.log(`Server Host at ${ENV.host}`, 'Main');
}
bootstrap();
