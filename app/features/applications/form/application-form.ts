import { withZod } from '@remix-validated-form/with-zod';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import {
  allPositionInterests,
  nonSkatingOfficials,
  skatingOfficials,
} from '~/db/schemas';
import { derbyCVUrlSchema } from '~/features/users/form/profile-form';

const positionInterestSchema = z.object({
  interest: zfd.text(z.enum(allPositionInterests)),
  asGhost: zfd.checkbox(),
});

const applicationFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  email: zfd.text(),
  civilName: zfd.text(),
  pronouns: zfd.text(),
  derbyName: zfd.text(),
  league: zfd.text(),
  emergencyContact: zfd.text(),
  medicalInformation: zfd.text(),
  derbyCVUrl: zfd.text(derbyCVUrlSchema),
  //
  notes: zfd.text(z.string().nullish()),
  //
  availabilities: z.array(
    z.object({
      matchId: zfd.numeric(z.number().optional()),
      selected: zfd.checkbox(),
    })
  ),
  //
  positions: z.object({
    SO: z.record(z.enum(skatingOfficials), positionInterestSchema),
    NSO: z.record(z.enum(nonSkatingOfficials), positionInterestSchema),
  }),
});

export const applicationFormValidator = withZod(applicationFormSchema);
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
export type PositionInterestFormData = z.infer<typeof positionInterestSchema>;
