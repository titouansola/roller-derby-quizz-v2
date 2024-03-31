import {
  pgTable,
  pgEnum,
  json,
  serial,
  varchar,
  date,
} from 'drizzle-orm/pg-core';

// ENUMS
export const refereePositionEnum = pgEnum('referee_position', [
  'HSO',
  'IPR',
  'JR',
  'OPR',
  'HNSO',
  'JT',
  'PLT',
  'PW',
  'SK',
  'SBO',
  'PBM',
  'PBT',
]);
export type RefereePosition = (typeof refereePositionEnum.enumValues)[number];

export const applicationStatusEnum = pgEnum('application_status', [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
]);
export type ApplicationStatus =
  (typeof applicationStatusEnum.enumValues)[number];

export const positionInterestEnum = pgEnum('position_interest', [
  'STRONG',
  'MEDIUM',
  'WEAK',
  'NO',
]);
export type PositionInterest = (typeof positionInterestEnum.enumValues)[number];

// QUESTION
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

// EXPERIENCE
export const experienceTable = pgTable('experiences', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  title: varchar('title').notNull(),
  position: refereePositionEnum('position').notNull(),
  date: date('date'),
  location: varchar('location'),
  notes: varchar('notes', { length: 1024 }),
});
export type SelectExperience = typeof experienceTable.$inferSelect;
export type InsertExperience = typeof experienceTable.$inferInsert;

// MEETING
export const meetingTable = pgTable('meetings', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  date: date('date').notNull(),
  location: varchar('location').notNull(),
  ownerId: varchar('owner_id').notNull(),
});
export type SelectMeeting = typeof meetingTable.$inferSelect;
export type InsertMeeting = typeof meetingTable.$inferInsert;

// APPLICATION
export type ApplicationPosition = {
  position: RefereePosition;
  interest: PositionInterest;
};
export const applicationTable = pgTable('applications', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  meetingId: varchar('meeting_id').notNull(),
  status: applicationStatusEnum('status').default('PENDING').notNull(),
  positions: json('positions').notNull().$type<ApplicationPosition[]>(),
  notes: varchar('notes', { length: 1024 }),
});
