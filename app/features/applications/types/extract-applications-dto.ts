import { RefereePosition } from '~/db/schemas';

export type ExtractUserApplicationDto = {
  derbyName: string;
  asGhost: boolean;
};

export type ExtractApplicationDto = Record<
  RefereePosition,
  ExtractUserApplicationDto[]
>;

export type ExtractApplicationsDto = Record<
  number, // MatchIndex
  ExtractApplicationDto
>;
