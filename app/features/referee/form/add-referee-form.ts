import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

const refereePositionSchema = z.object({
  matchId: zfd.numeric(),
  position: zfd.text(z.enum(refereePositionEnum.enumValues)),
  skating: zfd.checkbox(),
});

const refereePositionFormSchema = zfd.formData(refereePositionSchema);

const addRefereeFormSchema = zfd.formData(
  z
    .object({
      email: zfd.text(),
      derbyName: zfd.text(),
      asGhost: zfd.checkbox(),
    })
    .merge(refereePositionSchema)
);

export const addRefereeFormValidator = withZod(addRefereeFormSchema);
export const refereePositionFormValidator = withZod(refereePositionFormSchema);
