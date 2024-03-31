import { useTranslation } from 'react-i18next';
import { MeetingDto } from '../types/meeting-dto';
import { ValidatedForm } from 'remix-validated-form';
import { Input } from '~/features/ui/form/Input';
import { meetingFormValidator } from '../form/meeting-form';
import { Date } from '~/features/ui/form/Date';

export function MeetingForm({ meeting }: { meeting?: MeetingDto }) {
  const { t } = useTranslation();
  //
  return (
    <ValidatedForm
      method="POST"
      validator={meetingFormValidator}
      defaultValues={meeting}
    >
      <Input name="id" hidden />
      <Input name="title" label="meeting.title" />
      <Date name="date" label="meeting.date" />
      <Input name="location" label="meeting.location" />
      <Input name="description" label="meeting.description" />
      <button type="submit">{t('confirm')}</button>
    </ValidatedForm>
  );
}
