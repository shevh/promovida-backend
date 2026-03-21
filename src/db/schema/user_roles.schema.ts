// src/db/schema/user_roles.schema.ts
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { tenants } from './tenants.schema';

export const userRoleTypes = [
  'CITIZEN', // cidadão comum
  'HEALTH_PROFESSIONAL', // profissional de saúde (médico, enfermeiro, nutricionista...)
  'MANAGER', // gestor da prefeitura / secretaria
  'ADMIN', // admin do sistema (raro)
] as const;

export type UserRoleType = (typeof userRoleTypes)[number];

export const userRoles = pgTable(
  'user_roles',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id),

    role: varchar('role', { length: 50 }).$type<UserRoleType>().notNull(),

    // Auditoria mínima
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.tenantId, table.role] }),
  }),
);

// Relations
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  tenant: one(tenants, {
    fields: [userRoles.tenantId],
    references: [tenants.id],
  }),
}));
