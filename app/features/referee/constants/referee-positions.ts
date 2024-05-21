import { nonSkatingOfficials, skatingOfficials } from '~/db/schemas';

export const refereePositions = [
  ...skatingOfficials.map((position) => ({ position, skating: true })),
  ...nonSkatingOfficials.map((position) => ({ position, skating: false })),
] as const;
