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
        <Link to="meetings/create">
          <button>{t('meeting.add_first')}</button>
        </Link>
      </div>
    );
  }
  //
  return (
    <div>
      <Link to="meetings/create">
        <button>{t('add')}</button>
      </Link>
      {meetings.map((meeting) => (
        <div key={meeting.id}>
          <Link to={`meetings/${meeting.id}`}>
            <button>{t('edit')}</button>
          </Link>
          <p>{meeting.title}</p>
          <p>
            {meeting.startDate}
            {!!meeting.endDate && ` - ${meeting.endDate}`}
          </p>
          <p>{meeting.location}</p>
          <p>{meeting.description}</p>
        </div>
      ))}
    </div>
  );
}
