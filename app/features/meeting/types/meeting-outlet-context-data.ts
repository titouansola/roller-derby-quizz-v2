import { ApplicationsByUserDto } from '~/features/applications/types/applications-by-user-dto';
import { MeetingDto } from './meeting-dto';
import { MatchDto } from '~/features/match/types/match-dto';
import { SelectManualApplication } from '~/db/schemas';
import { MeetingAdminDto } from './meeting-admin-dto';

export type MeetingOutletContextData = {
  meeting: MeetingDto;
  meetingAdmins: MeetingAdminDto[];
  applications: ApplicationsByUserDto;
  manualApplications: SelectManualApplication[];
  matches: MatchDto[];
};
