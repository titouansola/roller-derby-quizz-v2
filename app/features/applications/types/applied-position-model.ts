import { ApplicationStatus, RefereePosition } from '~/db/schemas';

export type AppliedPositionModel = {
  id: number;
  status: ApplicationStatus;
  position: RefereePosition;
  derbyName: string;
  matchId: number;
  asGhost: boolean;
  derbyCV?: string;
};
