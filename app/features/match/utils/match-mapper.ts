import { SelectMatch } from '~/db/schemas';
import { MatchDto } from '../types/match-dto';

export function toMatchDto(match: SelectMatch): MatchDto {
  return { ...match };
}
