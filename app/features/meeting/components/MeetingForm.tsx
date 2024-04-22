import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { useFetcher } from '@remix-run/react';
import { Input } from '~/features/ui/form/Input';
import { MeetingDto } from '../types/meeting-dto';
import { meetingFormValidator } from '../form/meeting-form';
import { MeetingDates } from './controls/MeetingDates';
import { ApplicationLimitDate } from './controls/ApplicationLimitDate';

export function MeetingForm({ meeting }: { meeting?: MeetingDto }) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  //
  return (
    <ValidatedForm
      method="POST"
      id="meeting"
      validator={meetingFormValidator}
      defaultValues={meeting}
      fetcher={fetcher}
      className="flex flex-col justify-between h-full"
    >
      <fieldset>
        <input name="id" defaultValue={meeting?.id} hidden />
        <Input name="title" label="meeting.title" />
        <MeetingDates />
        <Input name="location" label="meeting.location" />
        <Input name="description" label="meeting.description" />
        <ApplicationLimitDate />
      </fieldset>
      <button>{t('confirm')}</button>
    </ValidatedForm>
  );
}
