import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const meetingFormSchema = zfd
  .formData({
    id: zfd.numeric(z.number().optional()),
    title: zfd.text(),
    startDate: zfd.text(),
    endDate: zfd.text(),
    applicationLimitDate: zfd.text(),
    location: zfd.text(),
    description: zfd.text(),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const applicationLimitDate = new Date(data.applicationLimitDate);
    //
    if (startDate > endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start date must be before end date',
      });
      return z.NEVER;
    }
    if (applicationLimitDate > startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Application limit date must be before start date',
      });
      return z.NEVER;
    }
  });

export const meetingFormValidator = withZod(meetingFormSchema);
