import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { CalendarIcon, UserIcon, UsersIcon } from 'lucide-react';
import { ConnectedUser, SelectMeetingPosition } from '~/db/schemas';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { MatchDto } from '~/features/match/types/match-dto';
import { ProfileFormFieldset } from '~/features/users/components/ProfileFormFieldset';
import { Button } from '~/features/ui/components/Button';
import { TextArea } from '~/features/ui/form/TextArea';
import { Input } from '~/features/ui/form/Input';
import { applicationFormValidator } from '../../form/application-form';
import { MyApplicationDto } from '../../types/my-application-dto';
import { toApplicationFormData } from '../../utils/application-mapper';
import { ApplicationPositionsForm } from './ApplicationPositionsForm';
import { ApplicationAvailabilitiesForm } from './availabilities/ApplicationAvailabilitiesForm';

export function ApplicationForm({
  user,
  application,
  meeting,
  meetingPositions,
  matches,
}: {
  user: ConnectedUser | null;
  application: MyApplicationDto | null;
  meeting: MeetingDto;
  meetingPositions: SelectMeetingPosition[];
  matches: MatchDto[];
}) {
  const { t } = useTranslation();
  const disabled = new Date(meeting.applicationLimitDate) < new Date();
  const defaultValues = useMemo(
    () => toApplicationFormData(user, application, meeting, matches),
    [user, application, meeting, matches]
  );
  //
  return (
    <>
      {disabled && <p>{t('meeting.too_late_to_apply')}</p>}
      <ValidatedForm
        method="POST"
        defaultValues={defaultValues}
        validator={applicationFormValidator}
      >
        <Input name="id" hidden />

        <div className="flex flex-col gap-8">
          <div>
            <h4 className="flex gap-2">
              <UserIcon />
              {t('application.personal_information')}
            </h4>
            <fieldset disabled={disabled}>
              <Input name="email" label="account.email" required />
              <ProfileFormFieldset required />
            </fieldset>
          </div>

          <div>
            <h4 className="flex gap-2">
              <CalendarIcon />
              {t('application.availabilities')}
            </h4>
            <fieldset disabled={disabled}>
              <ApplicationAvailabilitiesForm
                meeting={meeting}
                matches={matches}
              />
            </fieldset>
          </div>

          <div>
            <h4 className="flex gap-2">
              <UsersIcon />
              {t('application.positions')}
            </h4>
            <fieldset disabled={disabled}>
              <ApplicationPositionsForm positions={meetingPositions} />
            </fieldset>
          </div>

          <div>
            <TextArea label="meeting.notes" name="notes" />
          </div>

          <Button label="meeting.apply" />
        </div>
      </ValidatedForm>
    </>
  );
}
