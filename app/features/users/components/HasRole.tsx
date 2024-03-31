import { useUser } from '@clerk/remix';
import { PropsWithChildren } from 'react';
import { hasRole } from '../utils/has-role';
import { toUser } from '../utils/user-mapper';
import { Role } from '../types';

export function HasRole({ role, children }: PropsWithChildren<{ role: Role }>) {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn || !hasRole(role, toUser(user))) {
    return null;
  }

  return children;
}
