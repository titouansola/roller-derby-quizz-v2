import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { MatchDto } from '~/features/match/types/match-dto';
import { UserApplicationDto } from '../../types/user-application-dto';
import { applicationFormValidator } from '../../form/application-form';
import { MatchApplicationForm } from './MatchApplicationForm';
import { Button } from '~/features/ui/components/Button';
import { TextArea } from '~/features/ui/form/TextArea';

export function ApplicationForm({
  userApplication,
  meeting,
  matches,
}: {
  userApplication: UserApplicationDto | null;
  meeting: MeetingDto;
  matches: MatchDto[];
}) {
  const { t } = useTranslation();
  const disabled = new Date(meeting.applicationLimitDate) < new Date();
  //
  const selectedMatches = useMemo(
    () =>
      Array.from(Object.keys(userApplication?.matchPositions ?? {})).map(
        (key) => parseInt(key.replace('match-', ''))
      ),
    [userApplication]
  );
  //
  return (
    <>
      {disabled && <p>{t('meeting.too_late_to_apply')}</p>}
      <ValidatedForm
        method="POST"
        defaultValues={userApplication ?? undefined}
        validator={applicationFormValidator}
      >
        <input
          name="id"
          defaultValue={userApplication?.application?.id}
          hidden
        />
        <fieldset disabled={disabled}>
          {matches.map((match) => (
            <MatchApplicationForm
              key={match.id}
              match={match}
              defaultChecked={selectedMatches.includes(match.id) ?? false}
            />
          ))}
          <TextArea label="meeting.notes" name="notes" />
          <Button label="meeting.apply" />
        </fieldset>
      </ValidatedForm>
    </>
  );
}
