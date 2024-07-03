import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './env.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: `${process.cwd()}/config/.env`,
      load: [configuration],
      isGlobal: true,
    }),
  ],
  exports: [],
})
export class ConfigurationsModule {}
