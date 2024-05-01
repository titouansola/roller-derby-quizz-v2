import { ValidatedForm } from 'remix-validated-form';
import { useFetcher } from '@remix-run/react';
import { Input } from '~/features/ui/form/Input';
import { MeetingDto } from '../types/meeting-dto';
import { meetingFormValidator } from '../form/meeting-form';
import { MeetingDates } from './controls/MeetingDates';
import { ApplicationLimitDates } from './controls/ApplicationLimitDates';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';

export function MeetingForm({ meeting }: { meeting?: MeetingDto }) {
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
        <Input name="description" label="meeting.description" />
        <ApplicationLimitDates />
        <FetcherSubmitButton
          actionName={!!meeting ? 'update_meeting' : 'create_meeting'}
          label="confirm"
        />
      </fieldset>
    </ValidatedForm>
  );
}
