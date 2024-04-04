import { ZodType, z } from 'zod';
import { zfd } from 'zod-form-data';
import { withZod } from '@remix-validated-form/with-zod';
import {
  PositionInterest,
  RefereePosition,
  positionInterestEnum,
  refereePositionEnum,
} from '~/db/schemas';

export const applicationFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  notes: zfd.text(z.string().nullable().optional()),
  matches: z.array(zfd.checkbox()).nonempty(),
  positions: z.object(
    refereePositionEnum.enumValues.reduce(
      (acc, position) =>
        Object.assign(acc, {
          [position]: z.object({
            value: zfd.text(z.enum(positionInterestEnum.enumValues)),
            asGhost: zfd.checkbox(),
          }),
        }),
      {} as Record<
        RefereePosition,
        ZodType<{ value: PositionInterest; asGhost: boolean }>
      >
    )
  ),
});

export const applicationFormValidator = withZod(applicationFormSchema);
