import { Role } from '.';

export type UserDto = {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  derbyName: string;
  pronouns: string;
  email: string;
  country: string;
  license: string;
};
