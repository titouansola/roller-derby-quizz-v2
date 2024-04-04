import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const meetingFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(),
  startDate: zfd.text(),
  endDate: zfd.text(z.string().nullable().optional()),
  applicationLimitDate: zfd.text(),
  location: zfd.text(),
  description: zfd.text(),
  matches: z.array(
    z.object({
      team1: zfd.text(),
      team2: zfd.text(),
      time: zfd.text(),
      day: zfd.numeric(z.number().min(1)),
    })
  ),
});

export const meetingFormValidator = withZod(meetingFormSchema);
