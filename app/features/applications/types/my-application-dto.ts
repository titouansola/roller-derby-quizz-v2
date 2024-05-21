import {
  SelectApplication,
  SelectApplicationAvailability,
  SelectApplicationPosition,
  SkatingOfficial,
  NonSkatingOfficial,
} from '~/db/schemas';

export type MyApplicationDto = {
  application: SelectApplication;
  positions: {
    SO: Partial<Record<SkatingOfficial, SelectApplicationPosition>>;
    NSO: Partial<Record<NonSkatingOfficial, SelectApplicationPosition>>;
  };
  availabilities: Record<number, SelectApplicationAvailability>;
};
