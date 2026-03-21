// src/db/schema/document_events.schema.ts
import { pgTable, uuid, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { documents } from './documents.schema';
import { users } from './users.schema';

export const documentEventTypes = ['CREATED', 'UPDATED', 'VERIFIED', 'REJECTED', 'EXPIRED', 'REPLACED', 'CANCELLED', 'RESTORED'] as const;

export type DocumentEventType = (typeof documentEventTypes)[number];

export const documentEvents = pgTable('document_events', {
    id: uuid('id').primaryKey().defaultRandom(),

    documentId: uuid('document_id')
        .references(() => documents.id)
        .notNull(),

    eventType: varchar('event_type', { length: 50 }).$type<DocumentEventType>().notNull(),
    actorId: uuid('actor_id').references(() => users.id),
    actorType: varchar('actor_type', { length: 50 }).default('USER').notNull(),
    reason: varchar('reason', { length: 500 }),
    payload: jsonb('payload').default({}),

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
export const documentEventsRelations = relations(documentEvents, ({ one }) => ({
    document: one(documents, { fields: [documentEvents.documentId], references: [documents.id] }),
    actor: one(users, { fields: [documentEvents.actorId], references: [users.id] }),
}));
