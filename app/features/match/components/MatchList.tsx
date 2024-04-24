import { t } from 'i18next';
import { Pen, Trash } from 'lucide-react';
import { useMatchMap } from '../utils/useMatchMap';
import { MatchDto } from '../types/match-dto';
import { formatTime } from '~/features/common/utils/formatTime';
import { formatDate } from '~/features/common/utils/formatDate';

export function MatchList({
  matches,
  onEditMatch,
  onDeleteMatch,
}: {
  matches: MatchDto[];
  onEditMatch: (match: MatchDto) => () => void;
  onDeleteMatch: (matchId: number) => () => void;
}) {
  const matchMap = useMatchMap(matches);
  const matchMapEntries = Array.from(matchMap.entries()).sort(([a], [b]) =>
    new Date(a) > new Date(b) ? 1 : -1
  );

  if (matchMapEntries.length === 0) {
    return <p className="text-center">{t('meeting.no_matches')}</p>;
  }

  return matchMapEntries.map(([date, matches]) => (
    <div key={date} className="flex flex-col gap-4">
      <h2 className="text-center font-bold">{formatDate(date)}</h2>
      {matches.map((match, index) => (
        <div
          key={index}
          className="reset flex justify-between bg-gray-100 px-2 py-4 rounded-lg text-[14px]"
        >
          <p className="font-bold">{formatTime(match.time)}</p>
          <p className="grow text-center">
            {match.team1} vs {match.team2}
          </p>
          <div className="flex gap-3">
            <button onClick={onEditMatch(match)}>
              <Pen size={20} />
            </button>
            <button onClick={onDeleteMatch(match.id)}>
              <Trash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  ));
}
