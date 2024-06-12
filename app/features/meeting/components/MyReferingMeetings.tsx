import { useTranslation } from 'react-i18next';
import { MeetingDto } from '../types/meeting-dto';
import { MeetingCard } from './MeetingCard';
import { RouteEnum } from '~/features/ui/enums/route-enum';

export function MyReferingMeetings({ meetings }: { meetings: MeetingDto[] }) {
  const { t } = useTranslation();
  //
  return (
    <div>
      <h2>{t('meeting.i_m_refering')}</h2>
      {meetings.length === 0 && <p>{t('meeting.empty')}</p>}
      <div className="flex flex-col gap-4">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            path={`${RouteEnum.MEETING_REFEREE}/${meeting.id}`}
          />
        ))}
      </div>
    </div>
  );
}
