import { RefereePosition } from '~/db/schemas';

export function getMinRefByPosition(position: RefereePosition) {
  switch (position) {
    case 'OPR':
      return 3;
    case 'IPR':
    case 'JR':
    case 'SK':
    case 'PBT':
      return 2;
    default:
      return 1;
  }
}
