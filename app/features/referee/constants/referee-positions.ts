import { nonSkatingOfficials, skatingOfficials } from '~/db/schemas';

export const refereePositions = [
  ...skatingOfficials.map((position) => ({ position, skating: true })),
  ...nonSkatingOfficials.map((position) => ({ position, skating: false })),
] as const;

export const defaultMeetingPositions = {
  skating: skatingOfficials.reduce(
    (acc, name) => ({ ...acc, [name]: true }),
    {}
  ),
  nonSkating: nonSkatingOfficials.reduce(
    (acc, name) => ({ ...acc, [name]: true }),
    {}
  ),
};
