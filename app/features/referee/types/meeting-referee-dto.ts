import { SelectReferee, SelectUser } from '~/db/schemas';

export type MeetingRefereeDto = SelectUser &
  Pick<
    SelectReferee,
    'position' | 'skating' | 'matchId' | 'asGhost' | 'notes'
  > & { userId: number };
