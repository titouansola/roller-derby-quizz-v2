import { useFetcher } from '@remix-run/react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'remix-validated-form';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Modal } from '~/features/ui/layout/Modal';

export function RestartModal({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { reset } = useFormContext('minimalSkillsForm');
  const uiAction = useCallback(() => {
    reset();
    close();
  }, [reset, close]);
  //
  if (!show) {
    return null;
  }
  //
  return (
    <Modal onClose={close}>
      <Modal.Title>{t('minimal_skills.restart')}</Modal.Title>
      <p>{t('minimal_skills.restart_message')}</p>
      <Modal.Footer>
        <Button label="cancel" onClick={close} />
        <fetcher.Form method="POST">
          <FetcherSubmitButton
            actionName="restart"
            label="confirm"
            fetcher={fetcher}
            uiAction={uiAction}
          />
        </fetcher.Form>
      </Modal.Footer>
    </Modal>
  );
}
