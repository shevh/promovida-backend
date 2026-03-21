// src/db/schema/documents.schema.ts
import { pgTable, uuid, varchar, timestamp, jsonb, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { documentTypes } from './document_types.schema';
import { countries } from './countries.schema';
import { documentEvents } from './document_events.schema';
import { documentArchives } from './document_archives.schema';
import { userDocuments } from './user_documents.schema';
import { users } from './users.schema';

export const documentStatuses = ['PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED', 'REPLACED', 'CANCELLED'] as const;
export type DocumentStatus = (typeof documentStatuses)[number];

export const documents = pgTable(
    'documents',
    {
        id: uuid('id').primaryKey().defaultRandom(),

        documentTypeId: uuid('document_type_id')
            .references(() => documentTypes.id)
            .notNull(),
        countryId: uuid('country_id')
            .references(() => countries.id)
            .notNull(),
        replacedById: uuid('replaced_by_id').references(() => documents.id),

        document: varchar('document', { length: 100 }).notNull(), // valor principal (ex.: "123.456.789-00")
        expirationDate: timestamp('expiration_date'),
        status: varchar('status', { length: 50 }).$type<DocumentStatus>().default('PENDING').notNull(),

        verifiedAt: timestamp('verified_at'),
        verifiedById: uuid('verified_by_id').references(() => users.id),
        replacementReason: varchar('replacement_reason', { length: 255 }),
        metadata: jsonb('metadata').default({}),

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
    },
    (table) => ({
        uniqueDocumentPerTypeAndCountry: unique('unique_document_per_type_country').on(
            table.documentTypeId,
            table.document,
            table.countryId,
        ),
    }),
);

// Relations
export const documentsRelations = relations(documents, ({ one, many }) => ({
    documentType: one(documentTypes, { fields: [documents.documentTypeId], references: [documentTypes.id] }),
    country: one(countries, { fields: [documents.countryId], references: [countries.id] }),
    replacedBy: one(documents, { fields: [documents.replacedById], references: [documents.id], relationName: 'replacements' }),
    replacements: many(documents, { relationName: 'replacedBy' }),
    events: many(documentEvents),
    archives: many(documentArchives),
    userDocuments: many(userDocuments),
}));
