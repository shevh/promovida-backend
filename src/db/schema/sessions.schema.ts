// src/db/schema/sessions.schema.ts
import { pgTable, uuid, varchar, timestamp, text, boolean, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { tenants } from './tenants.schema';

export const sessions = pgTable(
    'sessions',
    {
        id: uuid('id').primaryKey().defaultRandom(),

        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),

        // Tenant atual selecionado no login (pode mudar)
        currentTenantId: uuid('current_tenant_id').references(() => tenants.id),

        // Tokens
        accessToken: text('access_token').notNull(), // JWT access token (ou hash dele)
        refreshTokenHash: text('refresh_token_hash').notNull(), // hash do refresh token (nunca armazene o raw)
        refreshTokenExpiresAt: timestamp('refresh_token_expires_at').notNull(),

        // Metadados de segurança
        ipAddress: varchar('ip_address', { length: 45 }), // IPv4/IPv6
        userAgent: text('user_agent'), // browser/device info
        deviceInfo: text('device_info'), // ex.: "Chrome 120 on Android"
        isActive: boolean('is_active').default(true).notNull(),

        // Expiração do access token
        expiresAt: timestamp('expires_at').notNull(),

        // Auditoria
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        deletedAt: timestamp('deleted_at'),
    },
    (table) => ({
        // Índices para performance
        idxUserActive: uniqueIndex('idx_user_active').on(table.userId, table.isActive),
        idxRefreshHash: uniqueIndex('idx_refresh_hash').on(table.refreshTokenHash),
    }),
);
