// src/db/schema/countries.schema.ts
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { states } from './states.schema';
import { tenants } from './tenants.schema';
import { users } from './users.schema';
import { auditTimestamps } from './utils/audit-fields';

export const countries = pgTable('countries', {
    id: uuid('id').primaryKey().defaultRandom(),

    name: varchar('name', { length: 255 }).unique().notNull(), // "Brasil", "United States"
    isoAlpha2: varchar('iso_alpha2', { length: 2 }).unique().notNull(), // "BR", "US"
    isoAlpha3: varchar('iso_alpha3', { length: 3 }).unique().notNull(), // "BRA", "USA"
    isoNumeric: varchar('iso_numeric', { length: 3 }).unique().notNull(), // "076", "840"
    dialingCode: varchar('dialing_code', { length: 15 }), // "+55", "+1"
    currencyCode: varchar('currency_code', { length: 3 }).notNull(), // "BRL", "USD"
    defaultLanguage: varchar('default_language', { length: 10 }).notNull(), // "pt-BR", "en-US"
    region: varchar('region', { length: 255 }), // "Americas", "Europe"
    subregion: varchar('subregion', { length: 255 }), // "South America", "Western Europe"
    timezone: varchar('timezone', { length: 255 }).default('UTC').notNull(), // "America/Sao_Paulo"
    i18nKey: varchar('i18n_key', { length: 255 }).unique(), // "country.brazil"

    // Auditoria
    ...auditTimestamps,

    createdById: uuid('created_by_id').references(() => users.id),
    createdByType: varchar('created_by_type', { length: 50 }).default('SYSTEM').notNull(),
    updatedById: uuid('updated_by_id').references(() => users.id),
    updatedByType: varchar('updated_by_type', { length: 50 }).default('SYSTEM').notNull(),
    deletedById: uuid('deleted_by_id').references(() => users.id),
    deletedByType: varchar('deleted_by_type', { length: 50 }).default('SYSTEM'),
});

// Relations (exemplos iniciais)
export const countriesRelations = relations(countries, ({ many }) => ({
    states: many(states), // estados do país
    tenants: many(tenants), // prefeituras e empresas localizadas no país
}));
