DO $$ BEGIN
 CREATE TYPE "referee_position" AS ENUM('HSO', 'IPR', 'JR', 'OPR', 'HNSO', 'JT', 'PLT', 'PW', 'SK', 'SBO', 'PBM', 'PBT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"position" "referee_position" NOT NULL,
	"date" date,
	"location" varchar,
	"notes" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"date" date NOT NULL,
	"location" varchar NOT NULL,
	"owner_id" varchar NOT NULL
);
