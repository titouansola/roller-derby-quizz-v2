import { useState } from 'react';
import { CalendarXIcon, UsersIcon } from 'lucide-react';
import { Button } from '~/features/ui/components/Button';
import { MeetingAdminModal } from './MeetingAdminModal';
import { MeetingDto } from '../../types/meeting-dto';
import { CancelMeetingModal } from './CancelMeetingModal';

export function MeetingActions({ meeting }: { meeting: MeetingDto }) {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const toggleAdminModal = () => {
    setShowAdminModal(!showAdminModal);
  };

  const toggleCancelModal = () => {
    setShowCancelModal(!showCancelModal);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button
          label="meeting.add_admins"
          Icon={UsersIcon}
          onClick={toggleAdminModal}
          disabled={meeting.cancelled}
          small
        />
        <Button
          label="meeting.cancel_meeting"
          Icon={CalendarXIcon}
          onClick={toggleCancelModal}
          small
        />
      </div>
      <MeetingAdminModal show={showAdminModal} close={toggleAdminModal} />
      <CancelMeetingModal
        meeting={meeting}
        show={showCancelModal}
        close={toggleCancelModal}
      />
    </>
  );
}
