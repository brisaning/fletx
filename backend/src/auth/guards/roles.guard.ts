import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Como cada usuario tiene solo un rol (string), cambiamos some por includes
    const hasRole = requiredRoles.includes(user.role); // Cambia roles por role
    if (!hasRole) {
      throw new ForbiddenException(
        `Necesitas uno de estos roles: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}