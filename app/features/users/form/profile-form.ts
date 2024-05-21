import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const derbyCVUrlSchema = z
  .string()
  .nullish()
  .refine((v) => !v || !!v.match('https://docs.google.com/spreadsheets/d'), {
    message: 'Invalid URL',
  });

export const profileFormSchema = zfd.formData({
  id: zfd.numeric(),
  externalId: zfd.text(),
  email: zfd.text(),
  civilName: zfd.text(z.string().nullish()),
  pronouns: zfd.text(z.string().nullish()),
  derbyName: zfd.text(z.string().nullish()),
  league: zfd.text(z.string().nullish()),
  emergencyContact: zfd.text(z.string().nullish()),
  medicalInformation: zfd.text(z.string().nullish()),
  derbyCVUrl: zfd.text(derbyCVUrlSchema),
});

export const profileValidator = withZod(profileFormSchema);
