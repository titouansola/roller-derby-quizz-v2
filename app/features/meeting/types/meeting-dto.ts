import { Match, MatchPositions } from '~/db/schemas';

export type MeetingDto = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  applicationLimitDate: string;
  location: string;
  description: string;
  matches: Match[];
  positions: MatchPositions[];
};