import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Modal } from '~/features/ui/layout/Modal';

export function MeetingPublishModal({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  //
  if (!show) {
    return null;
  }
  //
  return (
    <Modal onClose={close}>
      <Modal.Title>{t('meeting.publish_meeting')}</Modal.Title>
      <p>{t('meeting.publish_meeting_confirmation')}</p>
      <Modal.Footer>
        <Button label="cancel" onClick={close} />
        <fetcher.Form method="POST">
          <FetcherSubmitButton
            actionName="publish_meeting"
            label="confirm"
            fetcher={fetcher}
            uiAction={close}
          />
        </fetcher.Form>
      </Modal.Footer>
    </Modal>
  );
}
