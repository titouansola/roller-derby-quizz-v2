import { useTranslation } from 'react-i18next';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { ApplicationListDto } from '../../types/application-dto';
import { MatchApplications } from './MatchApplications';

export function AllApplications({
  applications,
  meeting,
}: {
  applications: ApplicationListDto[];
  meeting: MeetingDto;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('meeting.applications')}</h2>
      {meeting.matches.map((match, matchIndex) => (
        <MatchApplications
          key={matchIndex}
          match={match}
          matchIndex={matchIndex}
          applications={applications}
          positions={meeting.positions[matchIndex]}
        />
      ))}
    </div>
  );
}
