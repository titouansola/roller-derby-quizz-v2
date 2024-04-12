import {
  pgTable,
  pgEnum,
  json,
  serial,
  varchar,
  date,
  integer,
  boolean,
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

export const positionInterestEnum = pgEnum('position_interest', [
  'STRONG',
  'MEDIUM',
  'WEAK',
]);
export type PositionInterest = (typeof positionInterestEnum.enumValues)[number];

export const applicationStatusEnum = pgEnum('application_status', [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
]);
export type ApplicationStatus =
  (typeof applicationStatusEnum.enumValues)[number];

// QUESTION TAG
export const questionTagTable = pgTable('question_tags', {
  id: serial('id').primaryKey(),
  label: varchar('label').notNull().unique(),
});
export type SelectQuestionTag = typeof questionTagTable.$inferSelect;
export type InsertQuestionTag = typeof questionTagTable.$inferInsert;

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
  tagId: integer('tag_id').references(() => questionTagTable.id),
});
export type SelectQuestion = typeof questionTable.$inferSelect;
export type InsertQuestion = typeof questionTable.$inferInsert;

// EXPERIENCE
export const experienceTable = pgTable('experiences', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  title: varchar('title').notNull(),
  positions: json('positions').notNull().$type<RefereePosition[]>(),
  date: date('date'),
  location: varchar('location'),
  notes: varchar('notes', { length: 1024 }),
});
export type SelectExperience = typeof experienceTable.$inferSelect;
export type InsertExperience = typeof experienceTable.$inferInsert;

// MEETING
export type Match = {
  team1: string;
  team2: string;
  time: string;
  day: number;
};
export const meetingTable = pgTable('meetings', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  applicationLimitDate: date('application_limit_date').notNull(),
  location: varchar('location').notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  ownerId: varchar('owner_id').notNull(),
  matches: json('matches').notNull().$type<Match[]>(),
});
export type SelectMeeting = typeof meetingTable.$inferSelect;
export type InsertMeeting = typeof meetingTable.$inferInsert;

// APPLICATIONS
export const applicationTable = pgTable('applications', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id),
  userId: varchar('user_id').notNull(),
  notes: varchar('notes', { length: 1024 }),
});
export type SelectApplication = typeof applicationTable.$inferSelect;
export type InsertApplication = typeof applicationTable.$inferInsert;

export const applicationPositionTable = pgTable('application_positions', {
  id: serial('id').primaryKey(),
  applicationId: integer('application_id')
    .notNull()
    .references(() => applicationTable.id),
  match: integer('match').notNull(),
  position: varchar('position').notNull().$type<RefereePosition>(),
  interest: varchar('interest').notNull().$type<PositionInterest>(),
  asGhost: boolean('as_ghost').notNull(),
  status: varchar('status').$type<ApplicationStatus>().default('PENDING'),
});
export type SelectApplicationPosition =
  typeof applicationPositionTable.$inferSelect;
export type InsertApplicationPosition =
  typeof applicationPositionTable.$inferInsert;
