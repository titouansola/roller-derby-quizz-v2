CREATE TABLE IF NOT EXISTS "question_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	CONSTRAINT "question_tags_label_unique" UNIQUE("label")
);
--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "tag_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_tag_id_question_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "question_tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
