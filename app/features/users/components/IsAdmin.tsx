import { useUser } from '@clerk/remix';
import { PropsWithChildren } from 'react';

export function IsAdmin({ children }: PropsWithChildren) {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn || !user?.publicMetadata?.admin) {
    return null;
  }

  return children;
}
