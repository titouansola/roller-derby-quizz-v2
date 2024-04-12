import { useTranslation } from 'react-i18next';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { MatchApplications } from './MatchApplications';
import { ApplicationsByUserDto } from '../../types/applications-by-user-dto';

export function AllApplications({
  applications,
  meeting,
}: {
  applications: ApplicationsByUserDto;
  meeting: MeetingDto;
}) {
  const { t } = useTranslation();
  const positions = Object.values(applications).flatMap(
    ({ positions }) => positions
  );
  //
  return (
    <div>
      <h2>{t('meeting.applications')}</h2>
      {meeting.matches.map((match, index) => (
        <MatchApplications
          key={index}
          match={match}
          applications={applications}
          matchPositions={positions.filter(({ match: i }) => i === index)}
        />
      ))}
    </div>
  );
}
