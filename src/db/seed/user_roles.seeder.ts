// src/db/seed/user_roles.seeder.ts
import * as schema from '../../db/schema';

export default async function seedUserRoles(
  tx: any,
  users: {
    superAdminId: string;
    gestorId: string;
    profissionalId: string;
    cidadaoId: string;
  },
  tenants: { prefeituraId: string },
) {
  console.log('  🌱 Seeding user roles...');

  await tx.insert(schema.userRoles).values([
    // Super Admin
    {
      userId: users.superAdminId,
      tenantId: tenants.prefeituraId,
      role: 'ADMIN',
    },

    // Gestor da SEMSA
    { userId: users.gestorId, tenantId: tenants.prefeituraId, role: 'MANAGER' },

    // Profissional de saúde (ex: médica da UBS)
    {
      userId: users.profissionalId,
      tenantId: tenants.prefeituraId,
      role: 'HEALTH_PROFESSIONAL',
    },

    // Cidadão comum
    {
      userId: users.cidadaoId,
      tenantId: tenants.prefeituraId,
      role: 'CITIZEN',
    },
  ]);

  console.log('  ✅ Roles vinculados à Prefeitura!');
}
