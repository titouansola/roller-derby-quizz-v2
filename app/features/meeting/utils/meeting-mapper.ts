import { SelectMeeting } from '~/db/schemas';
import { MeetingDto } from '../types/meeting-dto';

export function toMeetingDto(meeting: SelectMeeting): MeetingDto {
  return {
    id: meeting.id,
    title: meeting.title,
    startDate: meeting.startDate,
    endDate: meeting.endDate,
    headRefLimitDate: meeting.headRefLimitDate,
    applicationLimitDate: meeting.applicationLimitDate,
    location: meeting.location,
    description: meeting.description,
    useMatchAvailability: meeting.useMatchAvailability,
    published: meeting.published,
    cancelled: meeting.cancelled,
    passed: new Date(meeting.endDate) < new Date(),
  };
}
