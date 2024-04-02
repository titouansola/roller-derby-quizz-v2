import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { withZod } from '@remix-validated-form/with-zod';
import { positionInterestEnum, refereePositionEnum } from '~/db/schemas';

export const applicationFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  notes: zfd.text(z.string().nullable().optional()),
  positions: z.object(
    refereePositionEnum.enumValues.reduce(
      (acc, position) =>
        Object.assign(acc, {
          [position]: zfd.text(z.enum(positionInterestEnum.enumValues)),
        }),
      {}
    )
  ),
});

export const applicationFormValidator = withZod(applicationFormSchema);
