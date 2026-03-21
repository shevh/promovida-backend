// src/db/schema/action_feedbacks.schema.ts
import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseFields, auditTimestamps, auditUsers } from './utils/audit-fields';
import { users } from './users.schema';
import { actions } from './actions.schema';
import { userParticipations } from './user_participations.schema';

export const actionFeedbacks = pgTable('action_feedbacks', {
  ...baseFields,
  ...auditTimestamps,
  ...auditUsers(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),

  actionId: uuid('action_id')
    .notNull()
    .references(() => actions.id),

  // Vinculado à participação (recomendado para evitar duplicatas)
  participationId: uuid('participation_id').references(
    () => userParticipations.id,
  ),

  // Avaliação
  rating: integer('rating').notNull(), // 1 a 5 estrelas
  comment: text('comment'), // feedback textual (opcional)

  // Metadados úteis para IA e dashboard
  wouldRecommend: boolean('would_recommend').default(true),
  improvementSuggestions: text('improvement_suggestions'),

  feedbackDate: timestamp('feedback_date').defaultNow().notNull(),
});

// Relations
export const actionFeedbacksRelations = relations(
  actionFeedbacks,
  ({ one }) => ({
    user: one(users, {
      fields: [actionFeedbacks.userId],
      references: [users.id],
    }),
    action: one(actions, {
      fields: [actionFeedbacks.actionId],
      references: [actions.id],
    }),
    participation: one(userParticipations, {
      fields: [actionFeedbacks.participationId],
      references: [userParticipations.id],
    }),
  }),
);
