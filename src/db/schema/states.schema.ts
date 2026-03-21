// src/db/schema/states.schema.ts
import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { countries } from './countries.schema';
import { addresses } from './addresses.schema';

export const states = pgTable('states', {
  id: uuid('id').primaryKey().defaultRandom(),

  countryId: uuid('country_id').references(() => countries.id).notNull(),

  name: varchar('name', { length: 255 }).notNull(),          // "São Paulo", "Minas Gerais"
  abbreviation: varchar('abbreviation', { length: 10 }).notNull(), // "SP", "MG", "RJ"

  i18nKey: varchar('i18n_key', { length: 255 }).unique(),    // opcional, para tradução

  isActive: boolean('is_active').default(true).notNull(),

  // Auditoria
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),

  createdById: uuid('created_by_id'),
  createdByType: varchar('created_by_type', { length: 50 }).default('SYSTEM'),
  updatedById: uuid('updated_by_id'),
  updatedByType: varchar('updated_by_type', { length: 50 }).default('SYSTEM'),
  deletedById: uuid('deleted_by_id'),
  deletedByType: varchar('deleted_by_type', { length: 50 }),
});

// Relations
export const statesRelations = relations(states, ({ one, many }) => ({
  country: one(countries, {
    fields: [states.countryId],
    references: [countries.id],
    relationName: 'states',
  }),

  // Futuras relações
  // tenants: many(tenants),          // clínicas no estado
  addresses: many(addresses),      // endereços no estado
  // taxRates: many(taxRates),        // alíquotas fiscais estaduais
}));