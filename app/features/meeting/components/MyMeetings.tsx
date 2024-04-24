import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { MeetingDto } from '../types/meeting-dto';

export function MyMeetings({ meetings }: { meetings: MeetingDto[] }) {
  const { t } = useTranslation();
  //
  if (meetings.length === 0) {
    return (
      <div>
        <p>{t('meeting.empty')}</p>
        <Link to="create">
          <button className="btn">{t('meeting.add_first')}</button>
        </Link>
      </div>
    );
  }
  //
  return (
    <div>
      <Link to="create">
        <button className="btn">{t('add')}</button>
      </Link>
      {meetings.map((meeting) => (
        <Link key={meeting.id} to={`${meeting.id}/details`}>
          <div>
            <p>{meeting.title}</p>
            <p>
              {meeting.startDate}
              {!!meeting.endDate && ` - ${meeting.endDate}`}
            </p>
            <p>{meeting.location}</p>
            <p>{meeting.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
