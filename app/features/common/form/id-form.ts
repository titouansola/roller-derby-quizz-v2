import { withZod } from '@remix-validated-form/with-zod';
import { zfd } from 'zod-form-data';

export const idFormSchema = zfd.formData({
  id: zfd.numeric(),
});

export const idFormValidator = withZod(idFormSchema);
