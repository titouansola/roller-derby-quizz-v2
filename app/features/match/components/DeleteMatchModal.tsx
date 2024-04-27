import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { Modal } from '~/features/ui/layout/Modal';
import { Input } from '~/features/ui/form/Input';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { idFormValidator } from '~/features/common/form/id-form';
import { Button } from '~/features/ui/components/Button';

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
      <Modal.Title>{t('meeting.delete_match')}</Modal.Title>
      <p className="my-4">{t('meeting.delete_match_confirmation')}</p>
      <ValidatedForm
        method="POST"
        validator={idFormValidator}
        defaultValues={{ id: matchId }}
        fetcher={fetcher}
      >
        <Input name="id" hidden />
        <Modal.Footer>
          <Button label="cancel" type="button" onClick={closeModal} />
          <FetcherSubmitButton
            label="confirm"
            actionName="delete"
            fetcher={fetcher}
            uiAction={closeModal}
          />
        </Modal.Footer>
      </ValidatedForm>
    </Modal>
  );
}
