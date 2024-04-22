import {
  RefereePosition,
  SelectApplication,
  SelectApplicationPosition,
} from '~/db/schemas';

export type ApplicationPositionsDto = Record<
  RefereePosition,
  SelectApplicationPosition | null
>;

export type UserApplicationDto = {
  application: SelectApplication;
  matchPositions: Record<`match-${number}`, ApplicationPositionsDto>;
};