import { SetMetadata } from '@nestjs/common';
import { ProfileUserEnum } from '../enums/profile-user.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...args: ProfileUserEnum[]) =>
  SetMetadata(ROLES_KEY, args);
