import { SelectApplication } from '~/db/schemas';
import { UserDto } from '~/features/users/types';
import { ApplicationDto, ApplicationListDto } from '../types/application-dto';

export function toApplicationListDto(
  application: SelectApplication,
  user: UserDto
): ApplicationListDto {
  return {
    id: application.id,
    userId: user.id,
    derbyName: user.derbyName,
    matches: application.matches,
    positions: application.positions,
    notes: application.notes,
  };
}

export function toApplicationDto(
  application: SelectApplication
): ApplicationDto {
  return {
    id: application.id,
    userId: application.userId,
    matches: application.matches,
    positions: application.positions,
    notes: application.notes,
  };
}