import { ObjectId } from "mongodb";
import { z } from "zod";

export const answerEntitySchema = z.object({
  label: z.string(),
  isRight: z.boolean(),
});

export type AnswerEntity = z.infer<typeof answerEntitySchema>;

export const questionEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  label: z.string(),
  explanations: z.string().optional(),
  answers: z.array(answerEntitySchema),
});

export type QuestionEntity = z.infer<typeof questionEntitySchema>;
