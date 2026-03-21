// src/db/schema/document_types.schema.ts
import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { countries } from './countries.schema';
import { documents } from './documents.schema';
import { users } from './users.schema';

export const documentTypes = pgTable('document_types', {
    id: uuid('id').primaryKey().defaultRandom(),

    countryId: uuid('country_id').references(() => countries.id), // opcional = global

    code: varchar('code', { length: 255 }).notNull(), // ex.: "CPF", "CNPJ", "RG", "PASSPORT"
    i18nKey: varchar('i18n_key', { length: 255 }).unique().notNull(), // ex.: "document_type.cpf"
    name: varchar('name', { length: 255 }), // ex.: "Cadastro de Pessoa Física" (opcional se usar só i18nKey)
    isPrimary: boolean('is_primary').default(false).notNull(),
    isActive: boolean('is_active').default(true).notNull(),

    // Auditoria
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),

    createdById: uuid('created_by_id').references(() => users.id),
    createdByType: varchar('created_by_type', { length: 50 }).default('SYSTEM').notNull(),
    updatedById: uuid('updated_by_id').references(() => users.id),
    updatedByType: varchar('updated_by_type', { length: 50 }).default('SYSTEM').notNull(),
    deletedById: uuid('deleted_by_id').references(() => users.id),
    deletedByType: varchar('deleted_by_type', { length: 50 }).default('SYSTEM'),
});

// Relations
export const documentTypesRelations = relations(documentTypes, ({ one, many }) => ({
    country: one(countries, {
        fields: [documentTypes.countryId],
        references: [countries.id],
    }),
    documents: many(documents),
}));
