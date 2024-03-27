import { Role } from '~/features/users/user-metadata.type';

export function hasRole(
  role: Role,
  user: { publicMetadata?: UserPublicMetadata } | undefined
) {
  const userRole = user?.publicMetadata?.role as Role | undefined;
  return userRole === Role.SUPER_ADMIN || role === userRole;
}
