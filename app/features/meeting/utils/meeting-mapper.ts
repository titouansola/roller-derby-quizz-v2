import { SelectMeeting } from '~/db/schemas';
import { MeetingDto } from '../types/meeting-dto';

export function toMeetingDto(meeting: SelectMeeting): MeetingDto {
  return {
    id: meeting.id,
    title: meeting.title,
    date: meeting.date,
    location: meeting.location,
    description: meeting.description,
    applications: [],
  };
}
