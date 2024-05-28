import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { RefereePosition } from '~/db/schemas';
import { Button } from '~/features/ui/components/Button';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Input } from '~/features/ui/form/Input';
import { Modal } from '~/features/ui/layout/Modal';
import {
  addRefereeFormValidator,
  refereePositionFormValidator,
} from '../../form/add-referee-form';
import { RefereePositionFields } from './RefereePositionFields';

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
      <p className="text-gray-400">
        {position} ({skating ? 'SO' : 'NSO'})
      </p>
      <ValidatedForm
        method="POST"
        validator={refereePositionFormValidator}
        defaultValues={{ matchId, position, skating }}
        fetcher={fetcher}
        className="my-4"
      >
        <RefereePositionFields />
        <FetcherSubmitButton
          actionName="add_myself"
          label="manual_referee.myself"
          fetcher={fetcher}
          uiAction={close}
          full
        />
      </ValidatedForm>
      <ValidatedForm
        method="POST"
        validator={addRefereeFormValidator}
        defaultValues={{ matchId, position, skating }}
        fetcher={fetcher}
      >
        <RefereePositionFields />

        <fieldset>
          <Input name="email" label="account.email" required />
          <Input name="derbyName" label="account.derby_name" required />
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
