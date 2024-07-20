import { nonSkatingOfficials, skatingOfficials } from '~/db/schemas';

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
