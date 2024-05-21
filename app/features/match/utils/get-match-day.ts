import { getDateDifference } from '~/features/common/utils/get-date-difference';

export function getMatchDay(matchDate: string, startDate: string): number {
  return getDateDifference(startDate, matchDate);
}
