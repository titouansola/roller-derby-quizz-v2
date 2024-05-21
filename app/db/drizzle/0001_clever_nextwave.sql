ALTER TABLE "meetings" ADD COLUMN "use_match_availability" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "published" boolean DEFAULT false NOT NULL;