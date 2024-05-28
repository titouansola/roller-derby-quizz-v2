import { RssIcon } from 'lucide-react';
import { useShowModal } from '~/features/common/utils/use-show-modal';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { Button } from '~/features/ui/components/Button';
import { MeetingPublishModal } from './MeetingPublishModal';

export function MeetingPublishButton({ meeting }: { meeting: MeetingDto }) {
  const [showModal, toggleModal] = useShowModal();
  //
  if (meeting.published) {
    return null;
  }
  //
  return (
    <>
      <Button
        label="meeting.publish_meeting"
        Icon={RssIcon}
        onClick={toggleModal}
        disabled={meeting.cancelled}
        small
      />
      <MeetingPublishModal show={showModal} close={toggleModal} />
    </>
  );
}
