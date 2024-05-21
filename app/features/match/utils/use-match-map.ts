import { useMemo } from 'react';
import { MatchDto } from '../types/match-dto';

export function useMatchMap(matches: MatchDto[]) {
  return useMemo(() => {
    const matchMap = new Map<string, MatchDto[]>();
    matches.forEach((match) => {
      if (!matchMap.has(match.date)) {
        matchMap.set(match.date, []);
      }
      matchMap.get(match.date)!.push(match);
    });
    Array.from(matchMap.values()).forEach((matches) => {
      matches.sort((a, b) => a.time.localeCompare(b.time));
    });
    return matchMap;
  }, [matches]);
}
