// src/db/schema/action_locations.schema.ts
import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { actions } from './actions.schema';
import { addresses } from './addresses.schema';

export const actionLocations = pgTable(
  'action_locations',
  {
    actionId: uuid('action_id')
      .notNull()
      .references(() => actions.id),
    addressId: uuid('address_id')
      .notNull()
      .references(() => addresses.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.actionId, table.addressId] }),
  }),
);

// Relations
export const actionLocationsRelations = relations(actionLocations, ({ one }) => ({
  action: one(actions, {
    fields: [actionLocations.actionId],
    references: [actions.id],
  }),
  address: one(addresses, {
    fields: [actionLocations.addressId],
    references: [addresses.id],
  }),
}));