import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';

export function identifyRefereeDoublons(
  referees: MeetingRefereeDto[]
): Map<number, string> {
  const allIds = new Set<number>();
  const doublons = new Map<number, string>();
  //
  for (const { userId, derbyName } of referees) {
    if (allIds.has(userId)) {
      doublons.set(userId, derbyName!);
    }
    allIds.add(userId);
  }
  //
  return doublons;
}
