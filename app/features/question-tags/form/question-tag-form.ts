import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const questionTagFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  label: zfd.text(),
});

export const questionTagValidator = withZod(questionTagFormSchema);
