DO $$ BEGIN
 CREATE TYPE "application_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "meeting_admin_role" AS ENUM('OWNER', 'ALT', 'HEAD_REF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "position_interest" AS ENUM('STRONG', 'MEDIUM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "referee_position" AS ENUM('HSO', 'IPR', 'JR', 'OPR', 'ALT', 'HNSO', 'JT', 'PLT', 'PW', 'SK', 'SBO', 'PBM', 'PBT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('ADMIN', 'SUPER_ADMIN', 'REGULAR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"day" integer,
	"match_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"position" "referee_position" NOT NULL,
	"interest" "position_interest" NOT NULL,
	"as_ghost" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"notes" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meeting_matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer NOT NULL,
	"team1" varchar NOT NULL,
	"team2" varchar NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meeting_admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"role" "meeting_admin_role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"head_ref_limit_date" date NOT NULL,
	"application_limit_date" date NOT NULL,
	"location" varchar NOT NULL,
	"description" varchar(1024) NOT NULL,
	"cancelled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(1024) NOT NULL,
	"explanations" varchar(1024),
	"answers" json NOT NULL,
	"tag_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	CONSTRAINT "question_tags_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meeting_referees" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer NOT NULL,
	"match_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"position" "referee_position" NOT NULL,
	"as_ghost" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"date" date NOT NULL,
	"score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar,
	"email" varchar NOT NULL,
	"role" "user_role" DEFAULT 'REGULAR' NOT NULL,
	"civil_name" varchar,
	"pronouns" varchar,
	"derby_name" varchar,
	"derby_cv_url" varchar,
	"league" varchar,
	"emergency_contact" varchar,
	"medical_information" varchar,
	CONSTRAINT "users_external_id_unique" UNIQUE("external_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_availabilities" ADD CONSTRAINT "application_availabilities_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_availabilities" ADD CONSTRAINT "application_availabilities_match_id_meeting_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "meeting_matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_positions" ADD CONSTRAINT "application_positions_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meeting_matches" ADD CONSTRAINT "meeting_matches_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meeting_admins" ADD CONSTRAINT "meeting_admins_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meeting_admins" ADD CONSTRAINT "meeting_admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_tag_id_question_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "question_tags"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meeting_referees" ADD CONSTRAINT "meeting_referees_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meeting_referees" ADD CONSTRAINT "meeting_referees_match_id_meeting_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "meeting_matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meeting_referees" ADD CONSTRAINT "meeting_referees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_histories" ADD CONSTRAINT "user_histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
