import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { Role } from '../types';

export const profileFormSchema = zfd.formData({
  id: zfd.text(),
  role: zfd.text(z.nativeEnum(Role)),
  firstName: zfd.text(),
  lastName: zfd.text(),
  derbyName: zfd.text(),
  email: zfd.text(),
  pronouns: zfd.text(),
  country: zfd.text(),
  license: zfd.text(),
});
export const profileValidator = withZod(profileFormSchema);
