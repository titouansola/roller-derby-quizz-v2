import {
  SelectApplication,
  SelectApplicationAvailability,
  SelectApplicationPosition,
  SelectUser,
} from '~/db/schemas';

export type ApplicationDto = {
  user: SelectUser;
  application: SelectApplication;
  availabilities: SelectApplicationAvailability[];
  positions: SelectApplicationPosition[];
};

export type ApplicationsByUserDto = Record<number, ApplicationDto>;
