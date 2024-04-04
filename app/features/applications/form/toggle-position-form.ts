import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { refereePositionEnum } from '~/db/schemas';

export const togglePositionFormSchema = zfd.formData({
  userId: zfd.text(),
  position: zfd.text(z.enum(refereePositionEnum.enumValues)),
  matchIndex: zfd.numeric(),
  asGhost: zfd.checkbox(),
});

export const togglePositionFormValidator = withZod(togglePositionFormSchema);
export type TogglePositionDto = z.infer<typeof togglePositionFormSchema>;
