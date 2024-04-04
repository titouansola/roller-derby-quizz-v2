import { ApplicationPosition } from '~/db/schemas';

export type ApplicationListDto = {
  id: number;
  userId: string;
  derbyName: string;
  matches: number[];
  positions: ApplicationPosition[];
  notes: string | null;
};

export type ApplicationDto = {
  id: number;
  userId: string;
  matches: number[];
  positions: ApplicationPosition[];
  notes: string | null;
};
