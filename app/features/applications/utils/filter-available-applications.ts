import { getMatchDay } from '~/features/match/utils/get-match-day';
import { ApplicationsByUserDto } from '../types/applications-by-user-dto';
import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';

export function filterAvailableApplications(
  applications: ApplicationsByUserDto,
  match: MatchDto,
  meeting: MeetingDto
) {
  const matchDay = getMatchDay(match.date, meeting.startDate);
  return Object.values(applications).filter((application) =>
    application.availabilities.some(
      (availability) =>
        availability.day === matchDay || availability.matchId === match.id
    )
  );
}
