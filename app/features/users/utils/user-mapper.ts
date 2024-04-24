import { Role, UserDto, UserMetadata } from '../types';

export function toUser(user: {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: { emailAddress: string }[];
  publicMetadata?: UserPublicMetadata;
}): UserDto {
  const publicMetadata = user.publicMetadata as UserMetadata | undefined;
  return {
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    derbyName: publicMetadata?.derbyName ?? '',
    pronouns: publicMetadata?.pronouns ?? '',
    country: publicMetadata?.country ?? '',
    license: publicMetadata?.license ?? '',
    derbyCV: publicMetadata?.derbyCV ?? '',
    role: publicMetadata?.role || Role.REGULAR,
  };
}

export function toUserMetadata(user: UserDto): UserMetadata {
  return {
    derbyName: user.derbyName,
    pronouns: user.pronouns,
    country: user.country,
    license: user.license,
    role: user.role,
    derbyCV: user.derbyCV,
  };
}
