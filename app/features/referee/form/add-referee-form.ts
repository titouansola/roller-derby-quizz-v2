import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

const addRefereeFormSchema = zfd.formData({
  matchId: zfd.numeric(),
  position: zfd.text(z.enum(refereePositionEnum.enumValues)),
  skating: zfd.checkbox(),
  //
  email: zfd.text(),
  derbyName: zfd.text(),
  asGhost: zfd.checkbox(),
});

export const addRefereeFormValidator = withZod(addRefereeFormSchema);
