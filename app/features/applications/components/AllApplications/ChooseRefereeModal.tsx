import { useFetcher } from '@remix-run/react';
import { useTranslation, Trans } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { idFormValidator } from '~/features/common/form/id-form';
import { Modal } from '~/features/ui/layout/Modal';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Input } from '~/features/ui/form/Input';
import { ExternalLink } from '~/features/ui/components/ExternalLink';
import { AppliedPositionModel } from '../../types/applied-position-model';

export function ChooseRefereeModal({
  show,
  application,
  close,
}: {
  show: boolean;
  application: AppliedPositionModel;
  close: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  if (!show) {
    return null;
  }

  return (
    <Modal onClose={close}>
      <Modal.Title>{t('application.modal_title')}</Modal.Title>
      <Trans
        i18nKey={'application.modal_text'}
        values={application}
        components={{ b: <b /> }}
      />

      <div className="my-2">
        {application.derbyCV ? (
          <ExternalLink
            label="application.see_derby_cv"
            href={application.derbyCV}
          />
        ) : (
          <p className="italic text-gray-400">{t('application.no_derby_cv')}</p>
        )}
      </div>

      <ValidatedForm
        method="POST"
        validator={idFormValidator}
        defaultValues={application}
        fetcher={fetcher}
      >
        <Input name="id" hidden />
        <Modal.Footer>
          <FetcherSubmitButton
            actionName="reject_application"
            label="application.reject"
            fetcher={fetcher}
            uiAction={close}
          />
          <FetcherSubmitButton
            actionName="accept_application"
            label="application.accept"
            fetcher={fetcher}
            uiAction={close}
          />
        </Modal.Footer>
      </ValidatedForm>
    </Modal>
  );
}
