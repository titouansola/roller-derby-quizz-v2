import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { Role, UserDto } from '../types';

export const profileFormSchema = zfd.formData({
  id: zfd.text(),
  role: zfd.text(z.nativeEnum(Role)),
  //
  firstName: zfd.text(z.string().optional()),
  lastName: zfd.text(z.string().optional()),
  pronouns: zfd.text(z.string().optional()),
  derbyName: zfd.text(z.string().optional()),
  email: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  license: zfd.text(z.string().optional()),
  derbyCV: zfd.text(
    z
      .string()
      .optional()
      .refine(
        (v) => !v || !!v.match('https://docs.google.com/spreadsheets/d'),
        {
          message: 'Invalid URL',
        }
      )
  ),
});

export const profileValidator = withZod(profileFormSchema);

export function transformProfileForm(
  data: z.infer<typeof profileFormSchema>
): UserDto {
  return {
    ...data,
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    pronouns: data.pronouns ?? '',
    derbyName: data.derbyName ?? '',
    email: data.email ?? '',
    country: data.country ?? '',
    license: data.license ?? '',
    derbyCV: data.derbyCV ?? '',
  };
}
