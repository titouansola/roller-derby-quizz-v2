import { SelectMatch, SelectReferee, SelectUser } from '~/db/schemas';
import { getMatchLabel } from '~/features/match/utils/get-match-label';
import { MeetingRefereeDto } from '../types/meeting-referee-dto';
import { RefereePositionDto } from '../types/referee-position-dto';

export function toMeetingReferees(
  rows: { user: SelectUser; referee: SelectReferee }[]
): MeetingRefereeDto[] {
  return rows.map((row) => ({
    ...row.user,
    ...row.referee,
    userId: row.referee.userId,
  }));
}

export function toRefereePositions(
  rows: { referee: SelectReferee; match: SelectMatch }[]
): RefereePositionDto[] {
  const matchMap: Record<number, RefereePositionDto> = {};
  //
  for (const { referee, match } of rows) {
    if (!matchMap[match.id]) {
      matchMap[match.id] = {
        positions: [],
        skating: referee.skating,
        asGhost: referee.asGhost,
        label: getMatchLabel(match),
        date: match.date,
        time: match.time,
      };
    }
    matchMap[match.id].positions.push(referee.position);
  }
  //
  return Object.values(matchMap);
}
