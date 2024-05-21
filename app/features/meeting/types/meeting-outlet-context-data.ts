import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingDto } from './meeting-dto';
import { MeetingAdminDto } from './meeting-admin-dto';

export type MeetingOutletContextData = {
  meeting: MeetingDto;
  meetingAdmins: MeetingAdminDto[];
  matches: MatchDto[];
};
