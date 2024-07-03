import { AutenticateModule } from '@modules/autenticate/autenticate.module';
import { HealthModule } from '@modules/health/health.module';

export const ROUTERS = [
  {
    path: 'healthcheck',
    module: HealthModule,
  },
  {
    path: 'auth',
    module: AutenticateModule,
  },
];
