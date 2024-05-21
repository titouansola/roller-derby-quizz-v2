import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { RefereePosition } from '~/db/schemas';
import { Button } from '~/features/ui/components/Button';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Input } from '~/features/ui/form/Input';
import { Modal } from '~/features/ui/layout/Modal';
import { addRefereeFormValidator } from '../form/add-referee-form';

export function AddRefereeModal({
  show,
  close,
  matchId,
  position,
  skating,
}: {
  show: boolean;
  close: () => void;
  matchId: number;
  position: RefereePosition;
  skating: boolean;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  if (!show) {
    return null;
  }

  return (
    <Modal>
      <Modal.Title>{t('manual_referee.modal_title')}</Modal.Title>
      <ValidatedForm
        method="POST"
        validator={addRefereeFormValidator}
        defaultValues={{ matchId, position }}
        fetcher={fetcher}
      >
        <Input name="matchId" hidden />
        <Input name="position" hidden />
        <input type="checkbox" name="skating" defaultChecked={skating} hidden />

        <fieldset>
          <p className="text-gray-400">
            {position} ({skating ? 'SO' : 'NSO'})
          </p>
          <Input name="email" label="account.email" />
          <Input name="derbyName" label="account.derby_name" />
          <Checkbox name="asGhost" label="application.as_ghost" />
        </fieldset>

        <Modal.Footer>
          <Button label="cancel" type="button" onClick={close} />
          <FetcherSubmitButton
            actionName="add_referee"
            label="confirm"
            fetcher={fetcher}
            uiAction={close}
          />
        </Modal.Footer>
      </ValidatedForm>
    </Modal>
  );
}
