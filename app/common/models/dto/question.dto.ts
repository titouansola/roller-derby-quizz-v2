import { z } from "zod";

export const answerDtoSchema = z.object({
  label: z.string(),
  isRight: z.boolean(),
});

export type AnswerDto = z.infer<typeof answerDtoSchema>;

export const questionDtoSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  explanations: z.string().optional(),
  answers: z
    .array(answerDtoSchema)
    .min(2)
    .refine((answers) => answers.some((answer) => answer.isRight)),
});

export type QuestionDto = z.infer<typeof questionDtoSchema>;
