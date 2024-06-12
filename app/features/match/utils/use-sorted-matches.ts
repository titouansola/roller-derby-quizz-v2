import { useMemo } from 'react';
import { MatchDto } from '../types/match-dto';
import { sortMatches } from './sort-matches';

export function useSortedMatches(matches: MatchDto[]) {
  return useMemo(() => sortMatches(matches), [matches]);
}
