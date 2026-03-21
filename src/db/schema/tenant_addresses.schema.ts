// src/db/schema/tenant_addresses.schema.ts
import { pgTable, uuid, boolean, varchar, primaryKey, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenants } from './tenants.schema';
import { addresses } from './addresses.schema';
import { users } from './users.schema';

// Enum específico para tipos de uso do endereço por tenant/clínica
export const tenantAddressTypes = [
    'HEADQUARTERS', // matriz/sede principal
    'BRANCH', // filial/unidade
    'BILLING', // endereço de cobrança/financeiro
    'SHIPPING', // endereço de entrega/insumos
    'OTHER', // outro
] as const;

export type TenantAddressType = (typeof tenantAddressTypes)[number];

export const tenantAddresses = pgTable(
    'tenant_addresses',
    {
        tenantId: uuid('tenant_id')
            .references(() => tenants.id)
            .notNull(),
        addressId: uuid('address_id')
            .references(() => addresses.id)
            .notNull(),

        isMain: boolean('is_main').default(false).notNull(), // endereço principal da clínica

        addressType: varchar('address_type', { length: 50 }).$type<TenantAddressType>().default('OTHER').notNull(), // tipo de uso específico para o tenant

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
        pk: primaryKey({ columns: [table.tenantId, table.addressId] }),
    }),
);

// Relations
export const tenantAddressesRelations = relations(tenantAddresses, ({ one }) => ({
    tenant: one(tenants, { fields: [tenantAddresses.tenantId], references: [tenants.id] }),
    address: one(addresses, { fields: [tenantAddresses.addressId], references: [addresses.id] }),
}));
