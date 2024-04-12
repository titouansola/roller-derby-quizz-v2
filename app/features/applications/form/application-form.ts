import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { withZod } from '@remix-validated-form/with-zod';
import {
  RefereePosition,
  positionInterestEnum,
  refereePositionEnum,
} from '~/db/schemas';

const applicationPositionSchema = z.object({
  id: zfd.numeric(z.number().optional()),
  interest: zfd.text(z.enum(positionInterestEnum.enumValues).optional()),
  asGhost: zfd.checkbox(),
});

const applicationPositionsSchema = z.record(
  z.enum(refereePositionEnum.enumValues),
  applicationPositionSchema.nullable()
);

const applicationFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  notes: zfd.text(z.string().nullish()),
  positions: z.array(applicationPositionsSchema),
});

export const applicationFormValidator = withZod(applicationFormSchema);
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export function transformApplicationForm(data: ApplicationFormData) {
  return {
    application: {
      id: data.id,
      notes: data.notes,
    },
    positions: data.positions.flatMap((matchPositions, matchIndex) =>
      Object.entries(matchPositions)
        .filter(([, applicationPosition]) => !!applicationPosition?.interest)
        .flatMap(([position, applicationPosition]) => ({
          match: matchIndex,
          position: position as RefereePosition,
          applicationId: data.id ?? 0,
          id: applicationPosition!.id,
          interest: applicationPosition!.interest!,
          asGhost: applicationPosition!.asGhost,
        }))
    ),
  };
}
