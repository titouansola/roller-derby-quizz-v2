import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { Input } from '~/features/ui/form/Input';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { UserApplicationDto } from '../types/user-application-dto';
import { applicationFormValidator } from '../form/application-form';
import { MatchApplicationForm } from './MatchApplicationForm';
import { useMemo } from 'react';

export function ApplicationForm({
  userApplication,
  meeting,
}: {
  userApplication: UserApplicationDto | null;
  meeting: MeetingDto;
}) {
  const { t } = useTranslation();
  const disabled = new Date(meeting.applicationLimitDate) < new Date();
  //
  const selectedMatches = useMemo(() => {
    const selectedMatches = new Set<number>();
    userApplication?.positions?.forEach((positions) => {
      Object.values(positions)
        .filter(Boolean)
        .forEach((position) => {
          selectedMatches.add(position!.match);
        });
    });
    return selectedMatches;
  }, [userApplication]);
  //
  return (
    <>
      {disabled && <p>{t('meeting.too_late_to_apply')}</p>}
      <ValidatedForm
        method="POST"
        defaultValues={userApplication ?? undefined}
        validator={applicationFormValidator}
      >
        <fieldset disabled={disabled}>
          {meeting.matches.map((match, matchIndex) => (
            <MatchApplicationForm
              key={matchIndex}
              match={match}
              matchIndex={matchIndex}
              defaultChecked={selectedMatches?.has(matchIndex) ?? false}
            />
          ))}
          <Input label="meeting.notes" name="notes" />
          <Input name="id" type="number" hidden />
          <button>{t('meeting.apply')}</button>
        </fieldset>
      </ValidatedForm>
    </>
  );
}
