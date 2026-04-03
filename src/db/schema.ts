import { pgTable, uuid, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('user'),
});
