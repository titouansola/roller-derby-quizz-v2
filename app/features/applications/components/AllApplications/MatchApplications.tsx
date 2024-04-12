import {
  Match,
  SelectApplicationPosition,
  refereePositionEnum,
} from '~/db/schemas';
import { ApplicationsByUserDto } from '../../types/applications-by-user-dto';
import { AppliedPosition } from './AppliedPosition';

export function MatchApplications({
  match,
  applications,
  matchPositions,
}: {
  match: Match;
  applications: ApplicationsByUserDto;
  matchPositions: SelectApplicationPosition[];
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
            {matchPositions
              .filter((p) => p.position === position)
              .map((positionApplication) => (
                <AppliedPosition
                  key={positionApplication.id}
                  user={applications[positionApplication.applicationId].user}
                  appliedPosition={positionApplication}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
