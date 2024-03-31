import { ValidatedForm } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { SelectExperience } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { Date } from '~/features/ui/form/Date';
import { experienceFormValidator } from '../form/experience-form';

export function ExperienceForm({
  experience,
}: {
  experience?: SelectExperience;
}) {
  const { t } = useTranslation();
  //
  return (
    <ValidatedForm
      method="POST"
      validator={experienceFormValidator}
      defaultValues={experience}
    >
      <Input name="id" hidden />
      <Input name="title" label="dashboard.experiences.title" />
      <Input name="position" label="dashboard.experiences.position" />
      <Date name="date" label="dashboard.experiences.date" />
      <Input name="location" label="dashboard.experiences.location" />
      <Input name="notes" label="dashboard.experiences.notes" />
      <button type="submit">{t('confirm')}</button>
    </ValidatedForm>
  );
}
