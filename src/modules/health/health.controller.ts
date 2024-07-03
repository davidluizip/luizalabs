import { configuration } from '@configurations/env.configuration';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import * as fs from 'fs-extra';
import * as path from 'path';
import { HealthCheckDTO } from './dtos/health-response.dto';

@Controller()
@ApiTags('HealthCheck')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('api')
  @HealthCheck()
  check() {
    const { host } = configuration().api;

    return this.health.check([
      () => this.http.pingCheck('nestjs-swagger', `${host}/api`),
    ]);
  }

  @Get('users-entity')
  @HealthCheck()
  async checkUsersEntity() {
    const filePath = path.resolve(__dirname, '../../../data/users/users.json');
    const healthResponse = new HealthCheckDTO();

    try {
      const exists = await fs.pathExists(filePath);

      if (!exists) {
        healthResponse.status = 'nok';
        healthResponse.error = { message: 'File not found' };
        return healthResponse;
      }

      healthResponse.status = 'ok';
      healthResponse.message = 'File found';
      return healthResponse;
    } catch (error) {
      console.error('Erro ao verificar arquivo users.json:', error.message);
      throw new Error('Erro no health check');
    }
  }
  @Get('orders-entity')
  @HealthCheck()
  async checkOrdersEntity() {
    const filePath = path.resolve(
      __dirname,
      '../../../data/orders/data-orders.json',
    );
    const healthResponse = new HealthCheckDTO();

    try {
      const exists = await fs.pathExists(filePath);

      if (!exists) {
        healthResponse.status = 'nok';
        healthResponse.error = { message: 'File not found' };
        return healthResponse;
      }

      healthResponse.status = 'ok';
      healthResponse.message = 'File found';
      return healthResponse;
    } catch (error) {
      console.error('Erro ao verificar arquivo orders.json:', error.message);
      throw new Error('Erro no health check');
    }
  }
}
