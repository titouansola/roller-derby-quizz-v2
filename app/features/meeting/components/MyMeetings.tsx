import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from 'lucide-react';
import { Button } from '~/features/ui/components/Button';
import { MeetingDto } from '../types/meeting-dto';
import { MeetingCard } from './MeetingCard';

export function MyMeetings({ meetings }: { meetings: MeetingDto[] }) {
  const { t } = useTranslation();
  //
  if (meetings.length === 0) {
    return (
      <>
        <p>{t('meeting.empty')}</p>
        <Link to="create">
          <Button label="meeting.add_first" />
        </Link>
      </>
    );
  }
  //
  const [incomingMeetings, passedMeetings] = meetings.reduce(
    ([incoming, passed], meeting) => {
      if (meeting.passed) {
        return [incoming, [...passed, meeting]];
      }
      return [[...incoming, meeting], passed];
    },
    [[], []] as [MeetingDto[], MeetingDto[]]
  );
  //
  const renderMeeting = (meeting: MeetingDto) => (
    <MeetingCard
      key={meeting.id}
      meeting={meeting}
      path={`${meeting.id}/details`}
    />
  );
  //
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex justify-between">
          <h2>{t('meeting.incoming')}</h2>
          <Link to="create">
            <Button Icon={PlusIcon} round />
          </Link>
        </div>
        {incomingMeetings.length === 0 ? (
          <p>{t('nothing')}</p>
        ) : (
          incomingMeetings.map(renderMeeting)
        )}
      </div>
      <div>
        <h2>{t('meeting.passed')}</h2>
        {passedMeetings.length === 0 ? (
          <p>{t('nothing')}</p>
        ) : (
          passedMeetings.map(renderMeeting)
        )}
      </div>
    </div>
  );
}
