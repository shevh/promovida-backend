// src/db/schema/actions.schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseFields, auditTimestamps, auditUsers } from './utils/audit-fields';
import { tenants } from './tenants.schema';
import { actionLocations } from './action_locations.schema';

// Enum em INGLÊS (melhor prática)
export const actionFrequencyTypes = [
  'WEEKLY', // Semanal
  'BIWEEKLY', // Quinzenal
  'MONTHLY', // Mensal
  'EVERY_TWO_MONTHS', // A cada 2 meses
  'EVENTUAL', // Eventual / pontual
  'FIXED', // Horário fixo (ex: toda terça às 8h)
] as const;

export type ActionFrequencyType = (typeof actionFrequencyTypes)[number];

export const actions = pgTable('actions', {
  ...baseFields,
  ...auditTimestamps,
  ...auditUsers(),

  name: varchar('name', { length: 255 }).notNull(), // "Grupo de Gestante", "NASFIT", "Aerodance"
  slug: varchar('slug', { length: 100 }).unique().notNull(),

  objective: text('objective').notNull(),
  targetAudience: text('target_audience').notNull(), // "Gestantes", "Idosos 60+", "Adolescentes 12-17"

  frequency: varchar('frequency', { length: 50 })
    .$type<ActionFrequencyType>()
    .notNull(),

  // Melhor usar jsonb (mais flexível para filtros e display)
  daysOfWeek: jsonb('days_of_week').default([]), // ["Terça-feira", "Quinta-feira"]
  time: varchar('time', { length: 100 }), // "15:00 às 16:00"

  howToAccess: text('how_to_access'),
  isActive: boolean('is_active').default(true).notNull(),

  // Vinculação com tenant
  tenantId: uuid('tenant_id')
    .references(() => tenants.id)
    .notNull(),
});

// Relations
export const actionsRelations = relations(actions, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [actions.tenantId],
    references: [tenants.id],
  }),
  locations: many(actionLocations), // múltiplos locais por ação
}));
