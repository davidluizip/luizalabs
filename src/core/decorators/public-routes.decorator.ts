import { SetMetadata } from '@nestjs/common';
import { ProfileUserEnum } from '../enums/profile-user.enum';

export const ROLES_KEY = 'roles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Roles = (..._roles: ProfileUserEnum[]) =>
  SetMetadata(ROLES_KEY, [ProfileUserEnum.PUBLIC]);
