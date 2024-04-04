import { PositionInterest, RefereePosition } from '~/db/schemas';

export type AppliedPositionDto = {
  userId: string;
  derbyName: string;
  position: RefereePosition;
  interest: PositionInterest;
  matchIndex: number;
  asGhost: boolean;
  accepted: boolean;
};
