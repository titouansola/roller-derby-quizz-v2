import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { withZod } from '@remix-validated-form/with-zod';
import { applicationStatusEnum } from '~/db/schemas';

export const updateApplicationStatusFormSchema = zfd.formData({
  id: zfd.numeric(),
  status: zfd.text(z.enum(applicationStatusEnum.enumValues)),
});
export const updateApplicationStatusValidator = withZod(
  updateApplicationStatusFormSchema
);
