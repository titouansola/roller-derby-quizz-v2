import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { ApplicationMatchAvailabilitiesForm } from './ApplicationMatchAvailabilitiesForm';
import { ApplicationDayAvailabilitiesForm } from './ApplicationDayAvailabilitiesForm';

export function ApplicationAvailabilitiesForm({
  meeting,
  matches,
}: {
  meeting: MeetingDto;
  matches: MatchDto[];
}) {
  if (meeting.useMatchAvailability) {
    return <ApplicationMatchAvailabilitiesForm matches={matches} />;
  } else if (meeting.startDate !== meeting.endDate) {
    return <ApplicationDayAvailabilitiesForm meeting={meeting} />;
  }
  return null;
}
