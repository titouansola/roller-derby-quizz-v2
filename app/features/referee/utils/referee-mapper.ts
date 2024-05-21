import { SelectReferee, SelectUser } from '~/db/schemas';
import { MeetingRefereeDto } from '../types/meeting-referee-dto';

export function toMeetingReferees(
  rows: { user: SelectUser; referee: SelectReferee }[]
): MeetingRefereeDto[] {
  return rows.map((row) => ({
    ...row.user,
    ...row.referee,
    userId: row.referee.userId,
  }));
}
