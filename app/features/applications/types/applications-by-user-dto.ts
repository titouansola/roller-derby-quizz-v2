import { SelectApplication, SelectApplicationPosition } from '~/db/schemas';
import { UserDto } from '~/features/users/types';

export type ApplicationDto = {
  user: UserDto;
  application: SelectApplication;
  positions: SelectApplicationPosition[];
};

export type ApplicationsByUserDto = Record<number, ApplicationDto>;
