import { ProfileUserEnum } from '../enums/profile-user.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (..._roles: ProfileUserEnum[]) => import("@nestjs/common").CustomDecorator<string>;
