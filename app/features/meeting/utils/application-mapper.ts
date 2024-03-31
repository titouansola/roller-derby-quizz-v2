import { SelectApplication } from '~/db/schemas';
import { UserDto } from '~/features/users/types';
import { ApplicationDto } from '../types/application-dto';

export function toApplicationDto(
  application: SelectApplication,
  user: UserDto
): ApplicationDto {
  return {
    id: application.id,
    userId: user.id,
    derbyName: user.derbyName,
    status: application.status,
    positions: application.positions,
    notes: application.notes,
  };
}
