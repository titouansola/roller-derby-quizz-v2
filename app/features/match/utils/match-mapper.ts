import { SelectMatch } from '~/db/schemas';

export function toMatchDto(match: SelectMatch) {
  return { ...match };
}
