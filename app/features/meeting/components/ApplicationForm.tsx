import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { useFetcher } from '@remix-run/react';
import { Input } from '~/features/ui/form/Input';
import { ApplicationDto } from '../types/application-dto';
import { applicationFormValidator } from '../form/application-form';
import { ApplicationInterestForm } from './ApplicationInterestForm';

export function ApplicationForm({
  application,
}: {
  application: ApplicationDto | null;
}) {
  const fetcher = useFetcher();
  const { t } = useTranslation();
  const defaultValues = useMemo(
    () =>
      !!application
        ? {
            id: application.id,
            notes: application.notes,
            positions: application.positions.reduce(
              (p, { position, interest }) =>
                Object.assign(p, { [position]: interest }),
              {}
            ),
          }
        : undefined,
    [application]
  );
  //
  return (
    <ValidatedForm
      method="POST"
      defaultValues={defaultValues}
      validator={applicationFormValidator}
      fetcher={fetcher}
    >
      <ApplicationInterestForm />
      <Input label="meeting.notes" name="notes" />
      <Input name="id" hidden />
      <button disabled={!!application && application.status !== 'PENDING'}>
        {t('meeting.apply')}
      </button>
    </ValidatedForm>
  );
}
