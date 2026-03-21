// src/db/seed/tenants.seeder.ts
import { SEED_CONFIG } from './seed.config';
import * as schema from '../../db/schema';

export default async function seedTenants(tx: any) {
  console.log('  🌱 Seeding tenants (Prefeitura)...');

  // Prefeitura Municipal de Nova Lima (tenant principal)
  const [prefeitura] = await tx
    .insert(schema.tenants)
    .values({
      name: SEED_CONFIG.defaultTenant.name,
      slug: SEED_CONFIG.defaultTenant.slug,
      type: SEED_CONFIG.defaultTenant.type,
      fantasyName: SEED_CONFIG.defaultTenant.fantasyName,
      responsibleName: SEED_CONFIG.defaultTenant.responsibleName,
      email: SEED_CONFIG.defaultTenant.email,
      phone: SEED_CONFIG.defaultTenant.phone,
      isActive: SEED_CONFIG.defaultTenant.isActive,
      isVerified: SEED_CONFIG.defaultTenant.isVerified,
      settings: {
        city: 'Nova Lima',
        state: 'MG',
        primaryColor: '#0066CC',
        secondaryColor: '#00B894',
      },
    })
    .returning({ id: schema.tenants.id });

  console.log(
    `  ✅ Prefeitura criada: ${prefeitura.id} (${SEED_CONFIG.defaultTenant.name})`,
  );

  return { prefeituraId: prefeitura.id };
}
