DO $$ BEGIN
 CREATE TYPE "position_interest" AS ENUM('STRONG', 'MEDIUM', 'WEAK', 'NO');
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
CREATE TABLE IF NOT EXISTS "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"meeting_id" integer NOT NULL,
	"positions" json NOT NULL,
	"matches" json NOT NULL,
	"notes" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"positions" json NOT NULL,
	"date" date,
	"location" varchar,
	"notes" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"application_limit_date" date NOT NULL,
	"location" varchar NOT NULL,
	"description" varchar(1024) NOT NULL,
	"owner_id" varchar NOT NULL,
	"matches" json NOT NULL,
	"positions" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(1024) NOT NULL,
	"explanations" varchar(1024),
	"answers" json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
