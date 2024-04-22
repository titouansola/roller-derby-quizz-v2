import { SelectApplicationPosition, refereePositionEnum } from '~/db/schemas';
import { ApplicationsByUserDto } from '../../types/applications-by-user-dto';
import { AppliedPosition } from './AppliedPosition';
import { MatchDto } from '~/features/match/types/match-dto';

export function MatchApplications({
  match,
  applications,
  matchPositions,
}: {
  match: MatchDto;
  applications: ApplicationsByUserDto;
  matchPositions: SelectApplicationPosition[];
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-[14px]">
        {match.team1} vs {match.team2}
      </h3>
      <div className="flex flex-col gap-2">
        {refereePositionEnum.enumValues.map((position) => (
          <div
            key={position}
            className="flex items-center border-b pb-2 text-[12px]"
          >
            <div className="w-16 font-semibold">{position}</div>
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
