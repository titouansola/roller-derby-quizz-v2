import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const searchMeetingFormSchema = zfd.formData({
  location: zfd.text(z.string().nullish()),
});

export const searchMeetingFormValidator = withZod(searchMeetingFormSchema);
