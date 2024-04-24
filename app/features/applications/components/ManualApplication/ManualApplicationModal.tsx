import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Trash } from 'lucide-react';
import { ValidatedForm } from 'remix-validated-form';
import { RefereePosition } from '~/db/schemas';
import { idFormValidator } from '~/features/common/form/id-form';
import { Modal } from '~/features/ui/layout/Modal';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Input } from '~/features/ui/form/Input';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { manualApplicationFormValidator } from '../../form/manual-application-form';
import { AppliedPositionModel } from '../../types/applied-position-model';

export function ManualApplicationModal({
  show,
  close,
  manualApplication,
  position,
  matchId,
}: {
  show: boolean;
  close: () => void;
  manualApplication?: AppliedPositionModel;
  position?: RefereePosition;
  matchId?: number;
}) {
  const fetcher = useFetcher();
  const { t } = useTranslation();

  if (!show) {
    return null;
  }

  return (
    <Modal>
      <Modal.Title>{t('manual_application.modal_title')}</Modal.Title>
      {!!manualApplication && (
        <Modal.TopRightAction>
          <ValidatedForm
            method="POST"
            validator={idFormValidator}
            fetcher={fetcher}
            defaultValues={{ id: manualApplication.id }}
          >
            <Input name="id" hidden />
            <FetcherSubmitButton
              actionName="delete_manual_application"
              fetcher={fetcher}
              uiAction={close}
              round
            >
              <Trash size={14} />
            </FetcherSubmitButton>
          </ValidatedForm>
        </Modal.TopRightAction>
      )}
      <ValidatedForm
        method="POST"
        defaultValues={{
          ...(manualApplication ?? { matchId, position }),
          status: !manualApplication || manualApplication.status === 'ACCEPTED',
        }}
        validator={manualApplicationFormValidator}
        fetcher={fetcher}
      >
        <fieldset>
          <Input name="id" hidden />
          <Input name="matchId" hidden />
          <Input name="position" hidden />
          <Input name="derbyName" label="profile.derby_name" />
          <Checkbox name="asGhost" label="application.as_ghost" />
          <Checkbox name="status" label="manual_application.status" />
        </fieldset>
        <Modal.Footer>
          <button className="btn" type="button" onClick={close}>
            {t('cancel')}
          </button>
          <FetcherSubmitButton
            actionName={
              !!manualApplication
                ? 'update_manual_application'
                : 'add_manual_application'
            }
            label="confirm"
            fetcher={fetcher}
            uiAction={close}
          />
        </Modal.Footer>
      </ValidatedForm>
    </Modal>
  );
}
