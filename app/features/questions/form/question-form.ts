import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const questionFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  label: zfd.text(),
  explanations: zfd.text(z.string().nullish()),
  answers: z
    .array(
      z.object({
        label: zfd.text(),
        isRight: zfd.checkbox(),
      })
    )
    .min(2)
    .refine((answers) => answers.some((answer) => answer.isRight)),
});

export const questionValidator = withZod(questionFormSchema);
