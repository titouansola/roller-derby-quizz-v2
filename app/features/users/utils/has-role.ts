import { SelectUser, UserRole } from '~/db/schemas';

export function hasRole(role: UserRole, user: SelectUser) {
  return user.role === 'SUPER_ADMIN' || user.role === role;
}
