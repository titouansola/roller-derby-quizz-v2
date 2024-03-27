import { useUser } from '@clerk/remix';
import { PropsWithChildren } from 'react';
import { hasRole } from '~/features/users/utils/has-role';
import { Role } from '~/features/users/user-metadata.type';

export function HasRole({ role, children }: PropsWithChildren<{ role: Role }>) {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn || !hasRole(role, user)) {
    return null;
  }

  return children;
}
