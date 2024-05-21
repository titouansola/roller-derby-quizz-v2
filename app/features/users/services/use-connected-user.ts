import { useRouteLoaderData } from '@remix-run/react';
import { ConnectedUser } from '~/db/schemas';

export function useConnectedUser() {
  const data = useRouteLoaderData<{ user: ConnectedUser | null }>('root');
  return data?.user ?? null;
}
