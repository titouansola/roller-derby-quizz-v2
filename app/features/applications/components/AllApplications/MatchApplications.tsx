import { Match, MatchPositions, refereePositionEnum } from '~/db/schemas';
import { ApplicationListDto } from '../../types/application-dto';
import { PositionApplications } from './PositionApplications';

export function MatchApplications({
  match,
  matchIndex,
  applications,
  positions,
}: {
  match: Match;
  matchIndex: number;
  applications: ApplicationListDto[];
  positions: MatchPositions;
}) {
  return (
    <div>
      <h3>
        {match.team1} vs {match.team2}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {refereePositionEnum.enumValues.map((position) => (
          <div
            key={position}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          >
            <span>{position}</span>
            <PositionApplications
              position={position}
              matchIndex={matchIndex}
              applications={applications}
              matchPositions={positions[position]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
