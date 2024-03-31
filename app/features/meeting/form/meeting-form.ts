import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const meetingFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(),
  date: zfd.text(),
  location: zfd.text(),
  description: zfd.text(),
});

export const meetingFormValidator = withZod(meetingFormSchema);
