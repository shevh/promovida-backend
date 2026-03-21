// src/db/schema/addresses.schema.ts
import {
  pgTable,
  uuid,
  varchar,
  decimal,
  text,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { countries } from './countries.schema';
import { states } from './states.schema';
import { userAddresses } from './user_addresses.schema';
import { tenantAddresses } from './tenant_addresses.schema';
import { auditTimestamps, auditUsers, baseFields } from './utils/audit-fields';

export const addresses = pgTable('addresses', {
  ...baseFields,
  ...auditTimestamps,
  ...auditUsers(),

  countryId: uuid('country_id')
    .references(() => countries.id)
    .notNull(),
  stateId: uuid('state_id').references(() => states.id), // opcional

  line1: varchar('line1', { length: 255 }).notNull(), // Rua + número + info principal
  line2: varchar('line2', { length: 255 }), // Complemento, apt, bloco, bairro, etc.
  neighborhood: varchar('neighborhood', { length: 120 }).notNull(), // Bairro (essencial pro promovida)
  postalCode: varchar('postal_code', { length: 50 }).notNull(), // CEP/Zip
  city: varchar('city', { length: 255 }).notNull(),

  // Geocoordenadas (essencial para mapa e "ações próximas")
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 10, scale: 8 }),

  notes: text('notes'),
  isActive: boolean('is_active').default(true).notNull(),
});

// Relations
export const addressesRelations = relations(addresses, ({ many }) => ({
  country: many(countries, { relationName: 'addresses' }),
  state: many(states, { relationName: 'addresses' }),
  userAddresses: many(userAddresses),
  tenantAddresses: many(tenantAddresses),
  // ... futuras
}));
