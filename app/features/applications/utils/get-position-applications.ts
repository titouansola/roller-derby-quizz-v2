import { RefereePosition } from '~/db/schemas';
import { ApplicationDto } from '../types/applications-by-user-dto';
import { UserApplicationDto } from '../types/user-application-dto';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';

export function getPositionApplications(
  applications: ApplicationDto[],
  position: RefereePosition,
  skating: boolean,
  referees: MeetingRefereeDto[]
) {
  return applications.reduce((acc, { user, application, positions }) => {
    const refereePositions = referees.filter((r) => r.userId === user.id);
    const positionInterest = positions.find(
      (p) =>
        p.position === position &&
        p.skating === skating &&
        !refereePositions.some(
          (r) => r.position === position && r.skating === skating
        )
    );
    if (!positionInterest) {
      return acc;
    }
    return [
      ...acc,
      {
        ...positionInterest,
        ...user,
        userId: user.id,
        applicationPositionId: positionInterest.id,
        notes: application.notes,
      },
    ];
  }, [] as UserApplicationDto[]);
}
