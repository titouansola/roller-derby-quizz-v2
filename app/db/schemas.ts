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
export const userRoleEnum = pgEnum('user_role', [
  'ADMIN',
  'SUPER_ADMIN',
  'REGULAR',
]);
export type UserRole = (typeof userRoleEnum.enumValues)[number];
export const skatingOfficials = ['HSO', 'IPR', 'JR', 'OPR', 'ALT'] as const;
export type SkatingOfficial = (typeof skatingOfficials)[number];
export const nonSkatingOfficials = [
  'HNSO',
  'JT',
  'PLT',
  'PW',
  'SK',
  'SBO',
  'PBM',
  'PBT',
  'ALT',
] as const;
export type NonSkatingOfficial = (typeof nonSkatingOfficials)[number];
export const refereePositionEnum = pgEnum('referee_position', [
  ...skatingOfficials,
  ...nonSkatingOfficials,
] as const);
export type RefereePosition = (typeof refereePositionEnum.enumValues)[number];

export const positionInterestEnum = pgEnum('position_interest', [
  'STRONG',
  'MEDIUM',
]);
export const allPositionInterests = [
  ...positionInterestEnum.enumValues,
  'NONE',
] as const;
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
  'ALT',
  'HEAD_REF',
]);
export type MeetingAdminRole = (typeof meetingAdminRoleEnum.enumValues)[number];

// USER
export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id').unique(),
  email: varchar('email').notNull().unique(),
  role: userRoleEnum('role').notNull().default('REGULAR'),
  civilName: varchar('civil_name'),
  pronouns: varchar('pronouns'),
  derbyName: varchar('derby_name'),
  derbyCVUrl: varchar('derby_cv_url'),
  league: varchar('league'),
  emergencyContact: varchar('emergency_contact'),
  medicalInformation: varchar('medical_information'),
});
export type SelectUser = typeof userTable.$inferSelect;
export type ConnectedUser = Omit<SelectUser, 'externalId'> & {
  externalId: string;
};
export type ListedUser = Pick<
  SelectUser,
  'id' | 'civilName' | 'derbyName' | 'role'
>;
export type InsertUser = typeof userTable.$inferInsert;

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
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
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
  useMatchAvailability: boolean('use_match_availability').notNull(),
  published: boolean('published').notNull().default(false),
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
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
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

// REFEREES
export const refereeTable = pgTable('meeting_referees', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id, { onDelete: 'cascade' }),
  matchId: integer('match_id')
    .notNull()
    .references(() => matchTable.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  skating: boolean('skating').notNull(),
  position: refereePositionEnum('position').notNull(),
  asGhost: boolean('as_ghost').notNull(),
  notes: varchar('notes', { length: 1024 }),
});
export type SelectReferee = typeof refereeTable.$inferSelect;
export type InsertReferee = typeof refereeTable.$inferInsert;

// APPLICATIONS
export const applicationTable = pgTable('applications', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetingTable.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
  notes: varchar('notes', { length: 1024 }),
});
export type SelectApplication = typeof applicationTable.$inferSelect;
export type InsertApplication = typeof applicationTable.$inferInsert;

export const applicationAvailabilityTable = pgTable(
  'application_availabilities',
  {
    id: serial('id').primaryKey(),
    applicationId: integer('application_id')
      .notNull()
      .references(() => applicationTable.id, { onDelete: 'cascade' }),
    day: integer('day'),
    matchId: integer('match_id').references(() => matchTable.id, {
      onDelete: 'cascade',
    }),
  }
);
export type SelectApplicationAvailability =
  typeof applicationAvailabilityTable.$inferSelect;
export type InsertApplicationAvailability =
  typeof applicationAvailabilityTable.$inferInsert;

export const applicationPositionTable = pgTable('application_positions', {
  id: serial('id').primaryKey(),
  applicationId: integer('application_id')
    .notNull()
    .references(() => applicationTable.id, { onDelete: 'cascade' }),
  skating: boolean('skating').notNull(),
  position: refereePositionEnum('position').notNull(),
  interest: positionInterestEnum('interest').notNull(),
  asGhost: boolean('as_ghost').notNull(),
});
export type SelectApplicationPosition =
  typeof applicationPositionTable.$inferSelect;
export type InsertApplicationPosition =
  typeof applicationPositionTable.$inferInsert;
