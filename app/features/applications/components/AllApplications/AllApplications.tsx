import { MatchApplications } from './MatchApplications';
import { SelectManualApplication } from '~/db/schemas';
import { MatchDto } from '~/features/match/types/match-dto';
import { ApplicationsByUserDto } from '../../types/applications-by-user-dto';

export function AllApplications({
  matches,
  applications,
  manualApplications,
}: {
  matches: MatchDto[];
  applications: ApplicationsByUserDto;
  manualApplications: SelectManualApplication[];
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
          matchPositions={positions.filter((p) => p.matchId === match.id)}
          applications={applications}
          manualApplications={manualApplications.filter(
            (a) => a.matchId === match.id
          )}
        />
      ))}
    </div>
  );
}
