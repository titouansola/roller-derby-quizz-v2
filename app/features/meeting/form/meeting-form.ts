import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { nonSkatingOfficials, skatingOfficials } from '~/db/schemas';

const skatingPositionsSchema = z.record(
  z.enum(skatingOfficials),
  zfd.checkbox()
);
const nonSkatingPositionsSchema = z.record(
  z.enum(nonSkatingOfficials),
  zfd.checkbox()
);

const meetingPositionsSchema = z.object({
  skating: skatingPositionsSchema,
  nonSkating: nonSkatingPositionsSchema,
});
export type MeetingPositionsSchema = z.infer<typeof meetingPositionsSchema>;

const meetingFormSchema = zfd
  .formData({
    id: zfd.numeric(z.number().optional()),
    title: zfd.text(),
    startDate: zfd.text(),
    endDate: zfd.text(),
    headRefLimitDate: zfd.text(),
    applicationLimitDate: zfd.text(),
    location: zfd.text(),
    description: zfd.text(),
    useMatchAvailability: zfd.checkbox(),
    positions: meetingPositionsSchema,
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const headRefLimitDate = new Date(data.headRefLimitDate);
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
    if (headRefLimitDate > applicationLimitDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Head ref limit date must be before application limit date',
      });
      return z.NEVER;
    }
  });

export const meetingFormValidator = withZod(meetingFormSchema);
