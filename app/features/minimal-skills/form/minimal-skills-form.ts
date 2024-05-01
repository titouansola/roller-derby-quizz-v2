import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const minimalSkillsFormSchema = zfd.formData({
  selected: zfd.repeatable(z.array(z.string()).nonempty()),
});

export const minimalSkillsFormValidator = withZod(minimalSkillsFormSchema);
