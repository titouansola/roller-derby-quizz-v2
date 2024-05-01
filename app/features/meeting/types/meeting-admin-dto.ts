import { SelectMeetingAdmin } from '~/db/schemas';

export type MeetingAdminDto = SelectMeetingAdmin & { derbyName: string };
