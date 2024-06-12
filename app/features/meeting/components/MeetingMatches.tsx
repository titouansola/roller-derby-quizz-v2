import { useOutletContext } from '@remix-run/react';
import { useState } from 'react';
import { ApplicationsByUserDto } from '~/features/applications/types/applications-by-user-dto';
import { filterAvailableApplications } from '~/features/applications/utils/filter-available-applications';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { useSortedMatches } from '~/features/match/utils/use-sorted-matches';
import { formatDate } from '~/features/common/utils/format-date';
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
  const sortedMatches = useSortedMatches(matches);
  const [openedMatches, setOpenedMatches] = useState(
    matches.map(({ id }) => id)
  );
  const toggleMatch = (id: number) =>
    setOpenedMatches((prev) => {
      if (prev.includes(id)) {
        prev.splice(prev.indexOf(id), 1);
      } else {
        prev.push(id);
      }
      return [...prev];
    });
  //
  return sortedMatches.map(([date, matches]) => (
    <div key={date}>
      <h3 className="text-center">{formatDate(date)}</h3>
      {matches.map((match) => {
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
            opened={openedMatches.includes(match.id)}
            toggleOpened={toggleMatch}
          />
        );
      })}
    </div>
  ));
}
