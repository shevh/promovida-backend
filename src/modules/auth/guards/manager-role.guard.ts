// src/modules/auth/guards/manager-role.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class ManagerRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const roles = user.roles || [];
    const hasPermission = roles.includes('MANAGER') || roles.includes('ADMIN');

    if (!hasPermission) {
      throw new ForbiddenException(
        'Acesso permitido apenas para gestores ou administradores',
      );
    }

    if (!user.currentTenantId) {
      throw new ForbiddenException('Tenant atual não selecionado no token JWT');
    }

    return true;
  }
}
