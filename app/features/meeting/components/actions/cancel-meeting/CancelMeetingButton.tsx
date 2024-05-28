import { CalendarXIcon, TrashIcon } from 'lucide-react';
import { Button } from '~/features/ui/components/Button';
import { CancelMeetingModal } from './CancelMeetingModal';
import { useShowModal } from '~/features/common/utils/use-show-modal';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';

export function CancelMeetingButton({
  meeting: { cancelled },
}: {
  meeting: MeetingDto;
}) {
  const [showModal, toggleModal] = useShowModal();
  return (
    <>
      <Button
        label={cancelled ? 'meeting.delete_meeting' : 'meeting.cancel_meeting'}
        Icon={cancelled ? TrashIcon : CalendarXIcon}
        onClick={toggleModal}
        small
      />
      <CancelMeetingModal
        cancelled={cancelled}
        show={showModal}
        close={toggleModal}
      />
    </>
  );
}
