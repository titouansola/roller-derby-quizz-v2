import { UserApplicationDto } from '~/features/applications/types/user-application-dto';
import { MeetingRefereeDto } from '../types/meeting-referee-dto';

export function isUserApplication(
  referee: MeetingRefereeDto | UserApplicationDto
): referee is UserApplicationDto {
  return 'interest' in referee;
}
