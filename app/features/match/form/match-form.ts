import { withZod } from '@remix-validated-form/with-zod';
import { zfd } from 'zod-form-data';

export const matchIdFormSchema = zfd.formData({
  id: zfd.numeric(),
});

export const matchFormSchema = zfd.formData({
  team1: zfd.text(),
  team2: zfd.text(),
  time: zfd.text(),
  date: zfd.text(),
});

export const matchIdFormValidator = withZod(matchIdFormSchema);
export const matchFormValidator = withZod(matchFormSchema);
