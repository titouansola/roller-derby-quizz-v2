import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { TriangleAlertIcon } from 'lucide-react';
import { Modal } from '~/features/ui/layout/Modal';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { MeetingDto } from '../../types/meeting-dto';

export function CancelMeetingModal({
  meeting,
  show,
  close,
}: {
  meeting: MeetingDto;
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  if (!show) return null;

  return (
    <Modal onClose={close}>
      <Modal.Title>{t('meeting.cancel_meeting')}</Modal.Title>
      <p>{t('meeting.cancel_meeting_confirmation')}</p>
      <Modal.Footer>
        <Button label="cancel" onClick={close} />
        <fetcher.Form method="POST">
          <input defaultValue={meeting.id} hidden />
          <FetcherSubmitButton
            actionName="cancel_meeting"
            label="confirm"
            Icon={TriangleAlertIcon}
            fetcher={fetcher}
            uiAction={close}
          />
        </fetcher.Form>
      </Modal.Footer>
    </Modal>
  );
}
