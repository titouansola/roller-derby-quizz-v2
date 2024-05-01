import { SelectMeetingAdmin } from '~/db/schemas';
import { UserDto } from '~/features/users/types';
import { MeetingAdminDto } from '../types/meeting-admin-dto';

export function toMeetingAdminDto(
  admin: SelectMeetingAdmin,
  user: UserDto
): MeetingAdminDto {
  return {
    ...admin,
    derbyName: user.derbyName,
  };
}
