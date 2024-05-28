import { MeetingDto } from '../../types/meeting-dto';
import { MeetingAdminButton } from './admin/MeetingAdminButton';
import { CancelMeetingButton } from './cancel-meeting/CancelMeetingButton';
import { MeetingPublishButton } from './publish-meeting/MeetingPublishButton';

export function MeetingActions({ meeting }: { meeting: MeetingDto }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <MeetingAdminButton meeting={meeting} />
        <MeetingPublishButton meeting={meeting} />
        <CancelMeetingButton meeting={meeting} />
      </div>
    </>
  );
}
