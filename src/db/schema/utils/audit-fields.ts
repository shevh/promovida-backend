// src/db/schema/utils/audit-fields.ts
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const baseFields = {
  id: uuid('id').primaryKey().defaultRandom(),
};

export const auditTimestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
};

// Versão simplificada (sem referência ao users para evitar ciclo eterno)
export const auditUsers = (prefix = '') => ({
  [`${prefix}createdById`]: uuid(`${prefix}created_by_id`),
  [`${prefix}createdByType`]: varchar(`${prefix}created_by_type`, { length: 50 }).default('SYSTEM').notNull(),
  [`${prefix}updatedById`]: uuid(`${prefix}updated_by_id`),
  [`${prefix}updatedByType`]: varchar(`${prefix}updated_by_type`, { length: 50 }).default('SYSTEM').notNull(),
  [`${prefix}deletedById`]: uuid(`${prefix}deleted_by_id`),
  [`${prefix}deletedByType`]: varchar(`${prefix}deleted_by_type`, { length: 50 }).default('SYSTEM'),
});