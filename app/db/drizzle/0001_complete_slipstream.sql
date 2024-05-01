ALTER TABLE "meeting_matches" ALTER COLUMN "time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "cancelled" boolean DEFAULT false NOT NULL;