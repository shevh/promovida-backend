// src/db/seed/seed.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';
import 'dotenv/config';

import seedUsers from './users.seeder';
import seedTenants from './tenants.seeder';
import seedUserRoles from './user_roles.seeder';
import seedActions from './actions.seeder'; // ← novo!
import seedBadges from './badges.seeder';
import seedUserParticipations from './user_participations.seeder';
import seedActionFeedbacks from './action_feedbacks.seeder';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function main() {
  console.log('🌱 Iniciando seed completo do Promovida...');

  try {
    let usersData: any;
    let tenantsData: any;

    await db.transaction(async (tx) => {
      // 1. Usuários
      usersData = await seedUsers(tx);

      // 2. Tenant Prefeitura
      tenantsData = await seedTenants(tx);

      // 3. Roles (cidadão, profissional, gestor, admin)
      await seedUserRoles(tx, usersData, tenantsData);

      // 4. Ações da Prefeitura (todas da planilha 2024)
      const actionsData = await seedActions(tx, tenantsData.prefeituraId);

      await seedBadges(tx); // ← badges primeiro
      await seedUserParticipations(tx, usersData, actionsData); // ← participations
      await seedActionFeedbacks(tx, usersData, actionsData);
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log('Dados úteis:');
    console.log(`- Prefeitura ID: ${tenantsData.prefeituraId}`);
    console.log(`- Super Admin ID: ${usersData.superAdminId}`);
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
