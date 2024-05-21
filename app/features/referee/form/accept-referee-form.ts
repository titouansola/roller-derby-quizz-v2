import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

const acceptRefereeFormSchema = zfd.formData({
  refereeId: zfd.numeric(z.number().optional()),
  userId: zfd.numeric(),
  matchId: zfd.numeric(),
  skating: zfd.checkbox(),
  position: zfd.text(z.enum(refereePositionEnum.enumValues)),
  asGhost: zfd.checkbox(),
});

export const acceptRefereeFormValidator = withZod(acceptRefereeFormSchema);
