import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingRefereeDto } from '../types/meeting-referee-dto';
import { ApplicationsByUserDto } from '~/features/applications/types/applications-by-user-dto';
import { sortMatches } from '~/features/match/utils/sort-matches';
import { refereePositions } from '../constants/referee-positions';
import { getMinRefByPosition } from './get-min-ref-by-position';

// WIP
export function getMagicPositions(
  matches: MatchDto[],
  referees: MeetingRefereeDto[],
  applications: ApplicationsByUserDto
) {
  const sortedMatches = sortMatches(matches);
  //
  for (const [, dayMatches] of sortedMatches) {
    const matchNumber = dayMatches.length;
    const matchIds = dayMatches.map(({ id }) => id);

    for (const refereePosition of refereePositions) {
      const positionReferees = referees.filter(
        ({ position, skating, matchId }) =>
          position === refereePosition.position &&
          skating === refereePosition.skating &&
          matchIds.includes(matchId)
      );
      const requiredRef = getMinRefByPosition(refereePosition.position);
      const requiredRefThisDay = requiredRef * matchNumber;
      //
      if (positionReferees.length >= requiredRefThisDay) {
        // We don't need more referees at this position for this day
        continue;
      }
      // TODO : find applications for this position available this day / match
      //
      for (const match of dayMatches) {
        const currentReferees = positionReferees.filter(
          ({ matchId }) => matchId === match.id
        );
      }
    }
  }
  //
  return null;
}
