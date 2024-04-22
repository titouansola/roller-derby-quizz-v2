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
  matchId: zfd.numeric(),
  interest: zfd.text(z.enum(positionInterestEnum.enumValues)),
  asGhost: zfd.checkbox(),
});

const applicationPositionsSchema = z.record(
  z.enum(refereePositionEnum.enumValues),
  applicationPositionSchema.nullable()
);

const applicationFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  notes: zfd.text(z.string().nullish()),
  matchPositions: z.record(applicationPositionsSchema),
});

export const applicationFormValidator = withZod(applicationFormSchema);
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export function transformApplicationForm(data: ApplicationFormData) {
  return {
    application: {
      id: data.id,
      notes: data.notes,
    },
    positions: Object.values(data.matchPositions).flatMap((matchPositions) =>
      Object.entries(matchPositions)
        .filter(([, applicationPosition]) => !!applicationPosition?.interest)
        .flatMap(([position, applicationPosition]) => ({
          id: applicationPosition!.id,
          applicationId: data.id ?? 0,
          matchId: applicationPosition!.matchId,
          position: position as RefereePosition,
          interest: applicationPosition!.interest!,
          asGhost: applicationPosition!.asGhost,
        }))
    ),
  };
}
