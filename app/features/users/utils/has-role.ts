import { Role, UserDto } from '../types';

export function hasRole(role: Role, user: UserDto) {
  return user.role === Role.SUPER_ADMIN || user.role === role;
}
