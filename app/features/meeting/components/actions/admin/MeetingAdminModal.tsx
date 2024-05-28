import { useOutletContext } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/features/ui/layout/Modal';
import { Button } from '~/features/ui/components/Button';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { UserSearch } from './UserSearch';
import { MeetingAdminForm } from './MeetingAdminForm';

export function MeetingAdminModal({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  const { meetingAdmins } = useOutletContext<MeetingOutletContextData>();
  const { t } = useTranslation();

  if (!show) {
    return null;
  }

  return (
    <Modal onClose={close}>
      <Modal.Title>{t('meeting.add_admins')}</Modal.Title>
      <UserSearch meetingAdmins={meetingAdmins} />
      <h3 className="mt-8">{t('meeting.current_admins')}</h3>
      {meetingAdmins.map((admin) => (
        <MeetingAdminForm key={admin.id} admin={admin} />
      ))}
      <Modal.Footer>
        <Button label="ok" onClick={close} full />
      </Modal.Footer>
    </Modal>
  );
}
