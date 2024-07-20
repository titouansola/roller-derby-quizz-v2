import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { TriangleAlertIcon } from 'lucide-react';
import { Modal } from '~/features/ui/layout/Modal';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';

export function CancelMeetingModal({
  cancelled,
  show,
  close,
}: {
  cancelled: boolean;
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  if (!show) return null;

  return (
    <Modal onClose={close}>
      <Modal.Title>
        {t(cancelled ? 'meeting.delete_meeting' : 'meeting.cancel_meeting')}
      </Modal.Title>
      <p>
        {t(
          cancelled
            ? 'meeting.delete_meeting_confirmation'
            : 'meeting.cancel_meeting_confirmation'
        )}
      </p>
      <Modal.Footer>
        <Button label="cancel" variant={'outline'} onClick={close} />
        <fetcher.Form method="POST">
          <FetcherSubmitButton
            actionName={cancelled ? 'delete_meeting' : 'cancel_meeting'}
            label="confirm"
            Icon={TriangleAlertIcon}
            fetcher={fetcher}
            uiAction={close}
            variant={'danger'}
          />
        </fetcher.Form>
      </Modal.Footer>
    </Modal>
  );
}
