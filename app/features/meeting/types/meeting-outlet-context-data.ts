import { ApplicationsByUserDto } from '~/features/applications/types/applications-by-user-dto';
import { MeetingDto } from './meeting-dto';
import { MatchDto } from '~/features/match/types/match-dto';

export type MeetingOutletContextData = {
  meeting: MeetingDto;
  applications: ApplicationsByUserDto;
  matches: MatchDto[];
};
