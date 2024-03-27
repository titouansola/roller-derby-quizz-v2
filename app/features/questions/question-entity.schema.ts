import { json, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export type Answer = {
  label: string;
  isRight: boolean;
};

export const questionTable = pgTable('questions', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 1024 }).notNull(),
  explanations: varchar('explanations', { length: 1024 }),
  answers: json('answers').notNull().$type<Answer[]>(),
});

export type SelectQuestion = typeof questionTable.$inferSelect;
export type InsertQuestion = typeof questionTable.$inferInsert;
