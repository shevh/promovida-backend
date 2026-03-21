// src/db/schema/users.schema.ts
import {
  pgTable,
  varchar,
  text,
  date,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userRoles } from './user_roles.schema';
import { userDocuments } from './user_documents.schema';
import { auditTimestamps, auditUsers, baseFields } from './utils/audit-fields';

// Enum para gênero (opcional, mas recomendado)
export const genderTypes = [
  'MALE',
  'FEMALE',
  'OTHER',
  'PREFER_NOT_TO_SAY',
] as const;
export type GenderType = (typeof genderTypes)[number];

export const users = pgTable('users', {
  ...baseFields, // id: uuid primary key
  ...auditTimestamps, // createdAt, updatedAt, deletedAt (timestamp)
  ...auditUsers(), // createdById, createdByType, updatedById, updatedByType, deletedById, deletedByType

  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),

  phone: varchar('phone', { length: 20 }).unique(),
  cpf: varchar('cpf', { length: 14 }).unique(), // essencial no Brasil

  // ── Dados pessoais (úteis para IA Coach e filtros de ações) ──
  birthDate: date('birth_date'), // para calcular idade e recomendar ações
  gender: varchar('gender', { length: 20 }).$type<GenderType>(),
  avatarUrl: text('avatar_url'), // foto de perfil

  // ── Status e segurança ───────────────────────────────────────
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at'),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles), // ← aqui o usuário tem 1 ou mais roles por tenant
  documents: many(userDocuments), // documentos oficiais vinculados ao usuário
}));
