// src/db/schema/tenant_documents.schema.ts
import { pgTable, uuid, boolean, primaryKey, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenants } from './tenants.schema';
import { documents } from './documents.schema';
import { users } from './users.schema';

export const tenantDocuments = pgTable(
    'tenant_documents',
    {
        tenantId: uuid('tenant_id')
            .references(() => tenants.id)
            .notNull(),
        documentId: uuid('document_id')
            .references(() => documents.id)
            .notNull(),

        isMain: boolean('is_main').default(false).notNull(), // documento principal (ex.: CNPJ principal)

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
        pk: primaryKey({ columns: [table.tenantId, table.documentId] }),
    }),
);

// Relations
export const tenantDocumentsRelations = relations(tenantDocuments, ({ one }) => ({
    tenant: one(tenants, { fields: [tenantDocuments.tenantId], references: [tenants.id] }),
    document: one(documents, { fields: [tenantDocuments.documentId], references: [documents.id] }),
}));
