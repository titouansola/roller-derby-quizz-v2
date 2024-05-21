import { PropsWithChildren } from 'react';
import { UserRole } from '~/db/schemas';
import { hasRole } from '../utils/has-role';
import { useConnectedUser } from '../services/use-connected-user';

export function HasRole({
  userRole,
  children,
}: PropsWithChildren<{ userRole: UserRole }>) {
  const user = useConnectedUser();
  if (!user || !hasRole(userRole, user)) {
    return null;
  }
  return children;
}
