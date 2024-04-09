import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { useFetcher } from '@remix-run/react';
import { Input } from '~/features/ui/form/Input';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { ApplicationDto } from '../types/application-dto';
import { applicationFormValidator } from '../form/application-form';
import { ApplicationInterestForm } from './ApplicationInterestForm';
import { ApplicationMatchesForm } from './ApplicationMatchesForm';

export function ApplicationForm({
  application,
  meeting,
}: {
  application: ApplicationDto | null;
  meeting: MeetingDto;
}) {
  const fetcher = useFetcher();
  const { t } = useTranslation();
  const disabled = new Date(meeting.applicationLimitDate) < new Date();
  const defaultValues = useMemo(
    () =>
      !!application
        ? {
            id: application.id,
            notes: application.notes,
            matches: meeting.matches.map((_, index) =>
              application.matches.includes(index)
            ),
            positions: application.positions.reduce(
              (p, { position, interest, asGhost }) =>
                Object.assign(p, { [position]: { value: interest, asGhost } }),
              {}
            ),
          }
        : undefined,
    [application, meeting]
  );
  //
  return (
    <>
      {disabled && <p>{t('meeting.too_late_to_apply')}</p>}
      <ValidatedForm
        method="POST"
        defaultValues={defaultValues}
        validator={applicationFormValidator}
        fetcher={fetcher}
      >
        <fieldset disabled={disabled}>
          <ApplicationInterestForm />
          <ApplicationMatchesForm meeting={meeting} />
          <Input label="meeting.notes" name="notes" />
          <Input name="id" hidden />
          <button>{t('meeting.apply')}</button>
        </fieldset>
      </ValidatedForm>
    </>
  );
}
