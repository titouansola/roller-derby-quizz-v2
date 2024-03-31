import { ValidatedForm } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { SelectExperience, refereePositionEnum } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { Date } from '~/features/ui/form/Date';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { CheckboxGroup } from '~/features/ui/form/CheckboxGroup';
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
      <Input name="title" label="meeting.title" />
      <CheckboxGroup name="positions" label="meeting.position">
        {refereePositionEnum.enumValues.map((position) => (
          <Checkbox
            name="positions"
            key={position}
            label={position}
            value={position}
          />
        ))}
      </CheckboxGroup>
      <Date name="date" label="meeting.date" />
      <Input name="location" label="meeting.location" />
      <Input name="notes" label="meeting.notes" />
      <button type="submit">{t('confirm')}</button>
    </ValidatedForm>
  );
}
