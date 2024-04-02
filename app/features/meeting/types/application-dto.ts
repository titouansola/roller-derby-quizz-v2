import { ApplicationPosition, ApplicationStatus } from '~/db/schemas';

export type ApplicationListDto = {
  id: number;
  userId: string;
  derbyName: string;
  status: ApplicationStatus;
  positions: ApplicationPosition[];
  notes: string | null;
};

export type ApplicationDto = {
  id: number;
  userId: string;
  status: ApplicationStatus;
  positions: ApplicationPosition[];
  notes: string | null;
};
