import { RefereePosition } from '~/db/schemas';

export type RefereePositionDto = {
  positions: RefereePosition[];
  skating: boolean;
  asGhost: boolean;
  label: string;
  date: string;
  time: string;
};
