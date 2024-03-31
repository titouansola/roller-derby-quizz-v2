import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

export const experienceFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(),
  positions: zfd.repeatable(z.array(z.enum(refereePositionEnum.enumValues))),
  date: zfd.text(z.string().nullable().optional()),
  location: zfd.text(z.string().nullable().optional()),
  notes: zfd.text(z.string().nullable().optional()),
});
export const experienceFormValidator = withZod(experienceFormSchema);
