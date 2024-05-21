import { ValidatedForm } from 'remix-validated-form';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Input } from '~/features/ui/form/Input';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { TextArea } from '~/features/ui/form/TextArea';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { MeetingDto } from '../types/meeting-dto';
import { meetingFormValidator } from '../form/meeting-form';
import { MeetingDates } from './controls/MeetingDates';
import { ApplicationLimitDates } from './controls/ApplicationLimitDates';

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
    >
      <fieldset disabled={meeting?.passed || meeting?.cancelled}>
        <input name="id" defaultValue={meeting?.id} hidden />
        <Input name="title" label="meeting.title" />
        <MeetingDates />
        <Input name="location" label="meeting.location" />
        <TextArea name="description" label="meeting.description" />
        <ApplicationLimitDates />
        <p className="text-gray-400">
          {t('meeting.use_match_availability_description')}
        </p>
        <Checkbox
          name="useMatchAvailability"
          label="meeting.use_match_availability"
        />
        <FetcherSubmitButton
          actionName={!!meeting ? 'update_meeting' : 'create_meeting'}
          label="confirm"
        />
      </fieldset>
    </ValidatedForm>
  );
}
