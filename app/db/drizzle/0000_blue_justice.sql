DO $$ BEGIN
 CREATE TYPE "application_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "meeting_admin_role" AS ENUM('OWNER', 'HEAD_REF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "position_interest" AS ENUM('STRONG', 'MEDIUM', 'WEAK');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "referee_position" AS ENUM('HSO', 'IPR', 'JR', 'OPR', 'HNSO', 'JT', 'PLT', 'PW', 'SK', 'SBO', 'PBM', 'PBT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"match_id" integer NOT NULL,
	"position" "referee_position" NOT NULL,
	"interest" "position_interest" NOT NULL,
	"as_ghost" boolean NOT NULL,
	"status" "application_status" DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"notes" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
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
	"user_id" varchar NOT NULL,
	"role" "meeting_admin_role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"application_limit_date" date NOT NULL,
	"location" varchar NOT NULL,
	"description" varchar(1024) NOT NULL
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
CREATE TABLE IF NOT EXISTS "user_histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"date" date NOT NULL,
	"score" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_positions" ADD CONSTRAINT "application_positions_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_positions" ADD CONSTRAINT "application_positions_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "matches" ADD CONSTRAINT "matches_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "questions" ADD CONSTRAINT "questions_tag_id_question_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "question_tags"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
