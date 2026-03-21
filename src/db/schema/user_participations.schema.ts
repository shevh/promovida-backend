// src/db/schema/user_participations.schema.ts
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseFields, auditTimestamps, auditUsers } from './utils/audit-fields';
import { users } from './users.schema';
import { actions } from './actions.schema';

export const participationStatusTypes = [
  'INTERESTED', // manifestou interesse (pré-inscrição)
  'ENROLLED', // inscrito oficialmente
  'CHECKED_IN', // fez check-in (presente)
  'COMPLETED', // concluiu a ação
  'CANCELED', // cancelou
] as const;

export type ParticipationStatusType = (typeof participationStatusTypes)[number];

export const userParticipations = pgTable('user_participations', {
  ...baseFields,
  ...auditTimestamps,
  ...auditUsers(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),

  actionId: uuid('action_id')
    .notNull()
    .references(() => actions.id),

  status: varchar('status', { length: 20 })
    .$type<ParticipationStatusType>()
    .default('INTERESTED')
    .notNull(),

  enrolledAt: timestamp('enrolled_at').defaultNow(),
  checkInAt: timestamp('check_in_at'), // quando fez check-in
  completedAt: timestamp('completed_at'), // quando concluiu

  pointsEarned: integer('points_earned').default(0), // para gamificação
  streakCount: integer('streak_count').default(0), // sequência de check-ins

  notes: text('notes'), // observação interna (opcional)
});

// Relations
export const userParticipationsRelations = relations(
  userParticipations,
  ({ one }) => ({
    user: one(users, {
      fields: [userParticipations.userId],
      references: [users.id],
    }),
    action: one(actions, {
      fields: [userParticipations.actionId],
      references: [actions.id],
    }),
  }),
);
