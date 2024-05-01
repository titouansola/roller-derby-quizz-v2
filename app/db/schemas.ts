import {
  pgTable,
  pgEnum,
  json,
  serial,
  varchar,
  date,
  integer,
  boolean,
  time,
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

export const meetingAdminRoleEnum = pgEnum('meeting_admin_role', [
  'OWNER',
  'HEAD_REF',
]);
export type MeetingAdminRole = (typeof meetingAdminRoleEnum.enumValues)[number];

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
  tagId: integer('tag_id').references(() => questionTagTable.id, {
    onDelete: 'set null',
  }),
});
export type SelectQuestion = typeof questionTable.$inferSelect;
export type InsertQuestion = typeof questionTable.$inferInsert;

// USER HISTORY
export const userHistoryTable = pgTable('user_histories', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(),
  date: date('date').notNull(),
  score: integer('score').notNull(),
});
export type SelectUserHistory = typeof userHistoryTable.$inferSelect;
export type InsertUserHistory = typeof userHistoryTable.$inferInsert;

// MEETING
export const meetingTable = pgTable('meetings', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  headRefLimitDate: date('head_ref_limit_date').notNull(),
  applicationLimitDate: date('application_limit_date').notNull(),
  location: varchar('location').notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  cancelled: boolean('cancelled').notNull().default(false),
});
export type SelectMeeting = typeof meetingTable.$inferSelect;
export type InsertMeeting = typeof meetingTable.$inferInsert;

// MEETING ADMIN
export const meetingAdminTable = pgTable('meeting_admins', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id, { onDelete: 'cascade' }),
  userId: varchar('user_id').notNull(),
  role: meetingAdminRoleEnum('role').notNull(),
});
export type SelectMeetingAdmin = typeof meetingAdminTable.$inferSelect;
export type InsertMeetingAdmin = typeof meetingAdminTable.$inferInsert;

// MATCH
export const matchTable = pgTable('meeting_matches', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id, { onDelete: 'cascade' }),
  team1: varchar('team1').notNull(),
  team2: varchar('team2').notNull(),
  date: date('date').notNull(),
  time: time('time').notNull(),
});
export type SelectMatch = typeof matchTable.$inferSelect;
export type InsertMatch = typeof matchTable.$inferInsert;

// APPLICATIONS
export const applicationTable = pgTable('applications', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id, { onDelete: 'cascade' }),
  userId: varchar('user_id').notNull(),
  notes: varchar('notes', { length: 1024 }),
});
export type SelectApplication = typeof applicationTable.$inferSelect;
export type InsertApplication = typeof applicationTable.$inferInsert;

export const applicationPositionTable = pgTable('application_positions', {
  id: serial('id').primaryKey(),
  applicationId: integer('application_id')
    .notNull()
    .references(() => applicationTable.id, { onDelete: 'cascade' }),
  matchId: integer('match_id')
    .notNull()
    .references(() => matchTable.id, { onDelete: 'cascade' }),
  position: refereePositionEnum('position').notNull(),
  interest: positionInterestEnum('interest').notNull(),
  asGhost: boolean('as_ghost').notNull(),
  status: applicationStatusEnum('status').notNull().default('PENDING'),
});
export type SelectApplicationPosition =
  typeof applicationPositionTable.$inferSelect;
export type InsertApplicationPosition =
  typeof applicationPositionTable.$inferInsert;

export const manualApplicationTable = pgTable('manual_applications', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id, { onDelete: 'cascade' }),
  matchId: integer('match_id')
    .notNull()
    .references(() => matchTable.id, { onDelete: 'cascade' }),
  position: refereePositionEnum('position').notNull(),
  derbyName: varchar('derby_name').notNull(),
  asGhost: boolean('as_ghost').notNull(),
  status: applicationStatusEnum('status').notNull().default('PENDING'),
});
export type SelectManualApplication =
  typeof manualApplicationTable.$inferSelect;
export type InsertManualApplication =
  typeof manualApplicationTable.$inferInsert;
