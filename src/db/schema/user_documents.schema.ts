// src/db/schema/user_documents.schema.ts
import { pgTable, uuid, boolean, timestamp, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { documents } from './documents.schema';

export const userDocuments = pgTable(
    'user_documents',
    {
        userId: uuid('user_id')
            .references(() => users.id)
            .notNull(),
        documentId: uuid('document_id')
            .references(() => documents.id)
            .notNull(),

        isMain: boolean('is_main').default(false).notNull(),

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
        pk: primaryKey({ columns: [table.userId, table.documentId] }),
    }),
);

// Relations
export const userDocumentsRelations = relations(userDocuments, ({ one }) => ({
    user: one(users, { fields: [userDocuments.userId], references: [users.id] }),
    document: one(documents, { fields: [userDocuments.documentId], references: [documents.id] }),
}));
