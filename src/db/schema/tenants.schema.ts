// src/db/schema/tenants.schema.ts
import { pgTable, varchar, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenantAddresses } from './tenant_addresses.schema';
import { users } from './users.schema';
import { tenantDocuments } from './tenant_documents.schema';
import { auditTimestamps, auditUsers, baseFields } from './utils/audit-fields';

// Tipos de Tenant (essencial para diferenciar Prefeitura de empresas)
export const tenantTypes = ['PREFEITURA', 'EMPRESA', 'ONG'] as const;
export type TenantType = (typeof tenantTypes)[number];

export const tenants = pgTable('tenants', {
  ...baseFields,
  ...auditTimestamps,
  ...auditUsers(),

  // Identificação
  name: varchar('name', { length: 255 }).notNull(), // "Prefeitura Municipal de Nova Lima"
  slug: varchar('slug', { length: 100 }).unique().notNull(), // "nova-lima" (ótimo para URLs)
  type: varchar('type', { length: 20 })
    .$type<TenantType>()
    .default('PREFEITURA')
    .notNull(),

  fantasyName: varchar('fantasy_name', { length: 255 }), // só para empresas
  responsibleName: varchar('responsible_name', { length: 255 }),

  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 20 }),

  // Configurações visuais e flexíveis
  logoUrl: varchar('logo_url', { length: 500 }),
  settings: jsonb('settings').default({}), // cores, módulos ativados, etc.

  // Status simples
  isActive: boolean('is_active').default(true).notNull(),
  isVerified: boolean('is_verified').default(true).notNull(), // prefeitura já vem verificada
});

// Relations
export const tenantsRelations = relations(tenants, ({ many }) => ({
  addresses: many(tenantAddresses), // ← perfeito para secretarias, UBS, praças, etc.
  users: many(users), // gestores, admins e profissionais vinculados
  documents: many(tenantDocuments), // documentos oficiais (CNPJ, alvará, etc.)
}));
