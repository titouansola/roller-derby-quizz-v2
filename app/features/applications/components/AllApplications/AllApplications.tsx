import { MatchApplications } from './MatchApplications';
import { ApplicationsByUserDto } from '../../types/applications-by-user-dto';
import { MatchDto } from '~/features/match/types/match-dto';

export function AllApplications({
  applications,
  matches,
}: {
  applications: ApplicationsByUserDto;
  matches: MatchDto[];
}) {
  const positions = Object.values(applications).flatMap(
    ({ positions }) => positions
  );
  //
  return (
    <div className="mt-8">
      {matches.map((match) => (
        <MatchApplications
          key={match.id}
          match={match}
          applications={applications}
          matchPositions={positions.filter((p) => p.matchId === match.id)}
        />
      ))}
    </div>
  );
}
