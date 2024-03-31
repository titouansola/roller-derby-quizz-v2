DO $$ BEGIN
 CREATE TYPE "application_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "position_interest" AS ENUM('STRONG', 'MEDIUM', 'WEAK', 'NO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"meeting_id" varchar NOT NULL,
	"status" "application_status" DEFAULT 'PENDING' NOT NULL,
	"positions" json NOT NULL,
	"notes" varchar(1024)
);
