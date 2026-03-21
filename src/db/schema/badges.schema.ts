// src/db/schema/badges.schema.ts
import { pgTable, varchar, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseFields, auditTimestamps, auditUsers } from './utils/audit-fields';
import { userBadges } from './user_badges.schema';

export const badges = pgTable('badges', {
  ...baseFields,
  ...auditTimestamps,
  ...auditUsers(),

  name: varchar('name', { length: 100 }).notNull(), // "Primeiro Passo", "Zero Cigarro"
  description: text('description').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(), // emoji ou nome do ícone (ex: "🏅", "🚭")
  points: integer('points').default(10).notNull(),
  criteria: text('criteria'), // "Fazer check-in na primeira ação"
  category: varchar('category', { length: 50 }).notNull(), // "BEGINNER", "HEALTH", "STREAK", "SOCIAL"
});

export const badgesRelations = relations(badges, ({ many }) => ({
  userBadges: many(userBadges),
}));
