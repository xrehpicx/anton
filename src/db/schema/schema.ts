import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const hello_world = pgTable('hello_world', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
});
