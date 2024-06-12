import { MatchDto } from '~/features/match/types/match-dto';
import { SelectMeetingPosition } from '~/db/schemas';
import { MeetingDto } from './meeting-dto';
import { MeetingAdminDto } from './meeting-admin-dto';

export type MeetingOutletContextData = {
  meeting: MeetingDto;
  meetingPositions: SelectMeetingPosition[];
  meetingAdmins: MeetingAdminDto[];
  matches: MatchDto[];
};
