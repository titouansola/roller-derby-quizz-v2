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
  return applications.reduce(
    (acc, { user, application, positions }) => {
      // 1. Filter applications
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
      // 2. Build object
      const userApplication: UserApplicationDto = {
        ...positionInterest,
        ...user,
        userId: user.id,
        applicationPositionId: positionInterest.id,
        notes: application.notes,
      };
      // 3. Split applications based on interest
      switch (positionInterest.interest) {
        case 'STRONG':
          acc[0].push(userApplication);
          break;
        case 'MEDIUM':
          acc[1].push(userApplication);
          break;
      }
      // 4. Return accumulator
      return acc;
    },
    [[], []] as [UserApplicationDto[], UserApplicationDto[]]
  );
}
