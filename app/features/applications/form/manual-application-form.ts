import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

export const manualApplicationFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  matchId: zfd.numeric(),
  position: zfd.text(z.enum(refereePositionEnum.enumValues)),
  derbyName: zfd.text(),
  asGhost: zfd.checkbox(),
  status: zfd.checkbox(),
});

export const manualApplicationFormValidator = withZod(
  manualApplicationFormSchema
);
