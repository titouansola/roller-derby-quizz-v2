import { ValidatedForm } from 'remix-validated-form';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { SelectMeetingPosition } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { TextArea } from '~/features/ui/form/TextArea';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { defaultMeetingPositions } from '~/features/referee/constants/referee-positions';
import { toMeetingPositionsSchema } from '~/features/meeting-positions/utils/meeting-positions-mapper';
import { MeetingDto } from '../types/meeting-dto';
import { meetingFormValidator } from '../form/meeting-form';
import { MeetingDates } from './controls/MeetingDates';
import { ApplicationLimitDates } from './controls/ApplicationLimitDates';
import { MeetingPositions } from './controls/MeetingPositions';

export function MeetingForm({
  meeting,
  meetingPositions,
}: {
  meeting?: MeetingDto;
  meetingPositions?: SelectMeetingPosition[];
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const positions =
    !!meetingPositions && meetingPositions.length > 0
      ? toMeetingPositionsSchema(meetingPositions)
      : defaultMeetingPositions;
  const disabled = meeting?.passed || meeting?.cancelled;
  //
  return (
    <ValidatedForm
      method={'POST'}
      className={'flex flex-col gap-10'}
      validator={meetingFormValidator}
      defaultValues={{
        ...(meeting || {}),
        positions,
      }}
      fetcher={fetcher}
    >
      <fieldset disabled={disabled}>
        <input name="id" defaultValue={meeting?.id} hidden />
        <Input name="title" label="meeting.title" required />
        <MeetingDates />
        <Input name="location" label="meeting.location" required />
        <TextArea name="description" label="meeting.description" required />
        <ApplicationLimitDates />
      </fieldset>

      <fieldset disabled={disabled}>
        <div>
          <h2>{t('application.availabilities')}</h2>
          <p className="text-grey-dark">
            {t('meeting.use_match_availability_description')}
          </p>
          <Checkbox
            name="useMatchAvailability"
            label="meeting.use_match_availability"
          />
        </div>
      </fieldset>

      <fieldset disabled={disabled}>
        <MeetingPositions />
      </fieldset>

      <FetcherSubmitButton
        label="confirm"
        actionName={!!meeting ? 'update_meeting' : 'create_meeting'}
        fetcher={fetcher}
        disabled={disabled}
        full
      />
    </ValidatedForm>
  );
}
