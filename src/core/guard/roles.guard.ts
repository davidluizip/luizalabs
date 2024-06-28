import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APIMESSAGE } from '@shared/services/api-message.helpers';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators';
import { ProfileUserEnum } from '../enums/profile-user.enum';

export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requiredRoles: ProfileUserEnum[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      this.logger.error(`permission not set for route ${request.route.path}`);
      return false;
    }

    return this.validateRequest(request, requiredRoles);
  }

  private validateRequest(
    req: Request,
    requiredRoles: ProfileUserEnum[],
  ): boolean {
    try {
      const role = req.user['roles'];

      if (
        Array.isArray(requiredRoles) &&
        requiredRoles.length > 0 &&
        (requiredRoles.includes(ProfileUserEnum.PUBLIC) ||
          role.is_admin ||
          this.matchRoles(requiredRoles, role.name))
      ) {
        return true;
      }
      throw new UnauthorizedException(APIMESSAGE.NOTPERMISSION());
    } catch (error) {
      throw new BadRequestException(APIMESSAGE.JWTNONCOMPLIANT());
    }
  }

  private matchRoles(roles: ProfileUserEnum[], userRole: string): boolean {
    return roles.some((role) => role === userRole);
  }
}
