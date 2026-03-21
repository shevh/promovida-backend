// src/db/seed/users.seeder.ts
import { SEED_CONFIG, hashPassword } from './seed.config';
import * as schema from '../../db/schema';

export default async function seedUsers(tx: any) {
  console.log('  🌱 Seeding users...');

  // Super Admin
  const [superAdmin] = await tx
    .insert(schema.users)
    .values({
      name: SEED_CONFIG.superAdmin.name,
      email: SEED_CONFIG.superAdmin.email,
      passwordHash: await hashPassword(SEED_CONFIG.superAdmin.password),
      isActive: true,
    })
    .returning({ id: schema.users.id });

  // Usuários de teste
  const [gestor] = await tx
    .insert(schema.users)
    .values({
      name: 'Carlos Mendes',
      email: 'gestor@pnl.mg.gov.br',
      passwordHash: await hashPassword(SEED_CONFIG.defaultPassword),
      birthDate: new Date('1985-03-12'),
      gender: 'MALE',
      cpf: '123.456.789-00',
    })
    .returning({ id: schema.users.id });

  const [profissional] = await tx
    .insert(schema.users)
    .values({
      name: 'Dra. Maria Oliveira',
      email: 'maria@pnl.mg.gov.br',
      passwordHash: await hashPassword(SEED_CONFIG.defaultPassword),
      birthDate: new Date('1990-07-25'),
      gender: 'FEMALE',
      cpf: '987.654.321-00',
    })
    .returning({ id: schema.users.id });

  const [cidadao] = await tx
    .insert(schema.users)
    .values({
      name: 'João Silva',
      email: 'joao@gmail.com',
      passwordHash: await hashPassword(SEED_CONFIG.defaultPassword),
      birthDate: new Date('1998-11-10'),
      gender: 'MALE',
      cpf: '111.222.333-44',
    })
    .returning({ id: schema.users.id });

  console.log('  ✅ 4 usuários seedados!');

  return {
    superAdminId: superAdmin.id,
    gestorId: gestor.id,
    profissionalId: profissional.id,
    cidadaoId: cidadao.id,
  };
}
