import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from '@/shared/enums/role.enum';
import { USER_ROLES_KEY } from '@/shared/decorators/roles.decorator';

/**
 * Check if the user are for clients
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      USER_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('user', user);

    console.log('requiredRoles', requiredRoles, UserRole);
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
