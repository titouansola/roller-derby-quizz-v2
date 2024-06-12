import { formatDate } from '~/features/common/utils/format-date';
import { formatTime } from '~/features/common/utils/format-time';
import { MatchDto } from '../types/match-dto';

export function getMatchLabel(match: MatchDto) {
  return `${match.team1} vs ${match.team2}`;
}

export function getMatchDateTime(match: MatchDto) {
  return `${formatDate(match.date)} ${formatTime(match.time)}`;
}

export function getFullMatchLabel(match: MatchDto) {
  return `${getMatchLabel(match)} - ${getMatchDateTime(match)}`;
}
