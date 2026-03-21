// src/db/schema/document_archives.schema.ts
import { pgTable, uuid, varchar, timestamp, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { documents } from './documents.schema';
import { users } from './users.schema';
// import { archives } from './archives.schema'; // se você tiver tabela de arquivos

export const documentArchiveTypes = ['FRONT', 'BACK', 'SELFIE', 'ADDRESS_PROOF', 'CONTRACT', 'OTHER'] as const;
export type DocumentArchiveType = (typeof documentArchiveTypes)[number];

export const documentArchiveStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'EXPIRED'] as const;
export type DocumentArchiveStatus = (typeof documentArchiveStatuses)[number];

export const documentArchives = pgTable(
    'document_archives',
    {
        id: uuid('id').primaryKey().defaultRandom(),

        documentId: uuid('document_id')
            .references(() => documents.id)
            .notNull(),
        // archiveId: uuid('archive_id').references(() => archives.id).notNull(), // se tiver tabela de arquivos

        type: varchar('type', { length: 50 }).$type<DocumentArchiveType>().default('OTHER').notNull(),
        status: varchar('status', { length: 50 }).$type<DocumentArchiveStatus>().default('PENDING').notNull(),

        verifiedAt: timestamp('verified_at'),
        verifiedById: uuid('verified_by_id').references(() => users.id),

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
        uniqueDocumentArchive: unique('unique_document_archive').on(table.documentId, table.id),
    }),
);

// Relations
export const documentArchivesRelations = relations(documentArchives, ({ one }) => ({
    document: one(documents, { fields: [documentArchives.documentId], references: [documents.id] }),
    verifiedBy: one(users, { fields: [documentArchives.verifiedById], references: [users.id] }),
}));
