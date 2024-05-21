import { useOutletContext } from '@remix-run/react';
import { ApplicationsByUserDto } from '~/features/applications/types/applications-by-user-dto';
import { filterAvailableApplications } from '~/features/applications/utils/filter-available-applications';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { MeetingOutletContextData } from '../types/meeting-outlet-context-data';
import { MeetingMatch } from './MeetingMatch';

export function MeetingMatches({
  applications,
  referees,
}: {
  applications: ApplicationsByUserDto;
  referees: MeetingRefereeDto[];
}) {
  const { matches, meeting } = useOutletContext<MeetingOutletContextData>();
  //
  return matches.map((match) => {
    const matchReferees = referees.filter(
      (referee) => referee.matchId === match.id
    );
    const availableApplications = filterAvailableApplications(
      applications,
      match,
      meeting
    );
    return (
      <MeetingMatch
        key={match.id}
        match={match}
        applications={availableApplications}
        referees={matchReferees}
      />
    );
  });
}
