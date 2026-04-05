import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const cats = pgTable('cats', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 59 }).notNull(),
  age: integer().notNull(),
  breed: varchar({ length: 255 }),
});

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 100 }).notNull(),
  password: varchar({ length: 20 }).notNull(),
});
