import { UsersIcon } from 'lucide-react';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { Button } from '~/features/ui/components/Button';
import { useShowModal } from '~/features/common/utils/use-show-modal';
import { MeetingAdminModal } from './MeetingAdminModal';

export function MeetingAdminButton({ meeting }: { meeting: MeetingDto }) {
  const [showModal, toggleModal] = useShowModal();
  return (
    <>
      <Button
        label="meeting.add_admins"
        Icon={UsersIcon}
        onClick={toggleModal}
        disabled={meeting.cancelled}
        small
      />
      <MeetingAdminModal show={showModal} close={toggleModal} />
    </>
  );
}
