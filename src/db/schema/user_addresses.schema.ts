// src/db/schema/user_addresses.schema.ts
import { pgTable, uuid, boolean, varchar, primaryKey, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { addresses } from './addresses.schema';

// Enum específico para tipos de uso do endereço por usuário (em inglês)
export const userAddressTypes = [
    'RESIDENTIAL', // endereço residencial principal
    'WORK', // endereço de trabalho
    'BILLING', // endereço de cobrança
    'SHIPPING', // endereço de entrega
    'TEMPORARY', // temporário (ex.: hotel, mudança)
    'OTHER', // outro
] as const;

export type UserAddressType = (typeof userAddressTypes)[number];

export const userAddresses = pgTable(
    'user_addresses',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        addressId: uuid('address_id')
            .notNull()
            .references(() => addresses.id),

        isMain: boolean('is_main').default(false).notNull(), // endereço principal do usuário

        addressType: varchar('address_type', { length: 50 }).$type<UserAddressType>().default('OTHER').notNull(), // tipo de uso específico para o usuário

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
        pk: primaryKey({ columns: [table.userId, table.addressId] }), // evita duplicatas
    }),
);

// Relations
export const userAddressesRelations = relations(userAddresses, ({ one }) => ({
    user: one(users, {
        fields: [userAddresses.userId],
        references: [users.id],
        relationName: 'user_addresses',
    }),
    address: one(addresses, {
        fields: [userAddresses.addressId],
        references: [addresses.id],
        relationName: 'user_addresses',
    }),
}));
