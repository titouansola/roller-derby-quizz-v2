import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

export const experienceFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(),
  position: zfd.text(z.enum(refereePositionEnum.enumValues)),
  date: zfd.text().nullable(),
  location: zfd.text().nullable(),
  notes: zfd.text().nullable(),
});
export const experienceFormValidator = withZod(experienceFormSchema);
