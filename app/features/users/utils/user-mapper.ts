import { ConnectedUser, SelectUser } from '~/db/schemas';

export function toConnectedUser(user: SelectUser): ConnectedUser {
  return {
    ...user,
    externalId: user.externalId ?? '',
  };
}
