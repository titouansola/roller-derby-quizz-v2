import {
  MatchPosition,
  RefereePosition,
  positionInterestEnum,
} from '~/db/schemas';
import { AppliedPosition } from './AppliedPosition';
import { ApplicationListDto } from '../../types/application-dto';
import { AppliedPositionDto } from '../../types/applied-position-dto';

export function PositionApplications({
  position,
  matchIndex,
  applications,
  matchPositions,
}: {
  position: RefereePosition;
  matchIndex: number;
  applications: ApplicationListDto[];
  matchPositions: MatchPosition[];
}) {
  const appliedPositions: AppliedPositionDto[] = [];
  //
  for (const application of applications) {
    // Skip applications that don't include current match
    if (!application.matches.includes(matchIndex)) {
      continue;
    }
    // Skip applications that don't include current position
    const positionInterest = application.positions.find(
      (ap) => ap.position === position
    )!;
    // Skip applications that are not interested in the position
    if (positionInterest.interest === 'NO') {
      continue;
    }
    appliedPositions.push({
      position,
      matchIndex,
      userId: application.userId,
      derbyName: application.derbyName,
      interest: positionInterest.interest,
      asGhost: positionInterest.asGhost,
      accepted: matchPositions.some(
        ({ userId }) => userId === application.userId
      ),
    });
  }
  //
  appliedPositions.sort(
    (a, b) =>
      positionInterestEnum.enumValues.indexOf(a.interest) -
      positionInterestEnum.enumValues.indexOf(b.interest)
  );
  //
  return appliedPositions.map((appliedPosition) => (
    <AppliedPosition
      key={`${position}.${appliedPosition.derbyName}`}
      appliedPosition={appliedPosition}
    />
  ));
}
