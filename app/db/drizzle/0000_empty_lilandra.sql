CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(1024) NOT NULL,
	"explanations" varchar(1024),
	"answers" json NOT NULL
);
