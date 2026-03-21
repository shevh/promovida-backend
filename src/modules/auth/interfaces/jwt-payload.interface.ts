import { UserRoleType } from '../../../db/schema/user_roles.schema';

export interface JwtPayload {
    sub: string; // user.id
    email: string;
    tid?: string; // current tenant id (opcional no primeiro login se múltiplos tenants)
    roles: UserRoleType[]; // roles NO tenant atual
    platformRoles?: string[]; // SUPER_ADMIN, SUPPORT, etc.
    iat?: number;
    exp?: number;
}
