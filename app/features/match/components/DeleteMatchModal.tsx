import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { Modal } from '~/features/ui/layout/Modal';
import { matchIdFormValidator } from '../form/match-form';
import { Input } from '~/features/ui/form/Input';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { useFetcher } from '@remix-run/react';

export function DeleteMatchModal({
  matchId,
  closeModal,
}: {
  matchId: number;
  closeModal: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  //
  if (matchId <= 0) {
    return null;
  }
  //
  return (
    <Modal onClose={closeModal}>
      <h3>{t('meeting.delete_match')}</h3>
      <p className="my-4">{t('meeting.delete_match_confirmation')}</p>
      <ValidatedForm
        method="POST"
        validator={matchIdFormValidator}
        defaultValues={{ id: matchId }}
        fetcher={fetcher}
      >
        <Input name="id" hidden />
        <div className="flex gap-4 justify-end">
          <button type="button" onClick={closeModal}>
            {t('cancel')}
          </button>
          <FetcherSubmitButton
            label="confirm"
            actionName="delete"
            fetcher={fetcher}
            uiAction={closeModal}
          />
        </div>
      </ValidatedForm>
    </Modal>
  );
}
