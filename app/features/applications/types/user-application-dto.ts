import { SelectApplicationPosition, SelectUser } from '~/db/schemas';

export type UserApplicationDto = SelectUser &
  SelectApplicationPosition & {
    userId: number;
    applicationPositionId: number;
    notes: string | null;
  };
