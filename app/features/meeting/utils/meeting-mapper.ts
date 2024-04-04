import { SelectMeeting } from '~/db/schemas';
import { MeetingDto } from '../types/meeting-dto';

export function toMeetingDto(meeting: SelectMeeting): MeetingDto {
  return {
    id: meeting.id,
    title: meeting.title,
    startDate: meeting.startDate,
    endDate: meeting.endDate,
    applicationLimitDate: meeting.applicationLimitDate,
    location: meeting.location,
    description: meeting.description,
    matches: meeting.matches,
    positions: meeting.positions,
  };
}
