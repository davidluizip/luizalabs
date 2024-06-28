import { Logger } from '@nestjs/common';
import { Type, plainToClass } from 'class-transformer';
import { IsEnum, ValidateNested, validateSync } from 'class-validator';
import { APIDTO, CACHEDTO, SALESFORCEDTO } from 'core/dto/envs.dto';

export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  api: {
    port: parseInt(process.env.API_PORT, 10) || 3000,
    host: process.env.API_HOST,
    jwt: {
      secret: process.env.API_SECRET_API,
    },
  },
  routes: {
    productsImports: {
      url: process.env.PRODUCT_IMPORT_URL,
      secret: process.env.PRODUCT_IMPORT_SECRET,
    },
  },
});

enum Environment {
  Local = 'local',
  Development = 'dev',
  Production = 'prod',
  Test = 'stg',
}

class EnvironmentVariables {
  @ValidateNested({ each: true })
  @Type(() => APIDTO)
  api: APIDTO;

  @ValidateNested({ each: true })
  @Type(() => CACHEDTO)
  cache: CACHEDTO;

  @ValidateNested({ each: true })
  @Type(() => SALESFORCEDTO)
  salesForce: SALESFORCEDTO;

  @IsEnum(Environment)
  NODE_ENV: Environment;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const [error] = errors;
    new Logger().error(JSON.stringify(error?.constraints));
    throw 'Variáveis definidas incorretas';
  }
  return validatedConfig;
};
