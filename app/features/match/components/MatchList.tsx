import { PenIcon, TrashIcon } from 'lucide-react';
import { t } from 'i18next';
import { formatDate } from '~/features/common/utils/format-date';
import { Button } from '~/features/ui/components/Button';
import { MatchDto } from '../types/match-dto';
import { getMatchLabel } from '../utils/get-match-label';
import { useMatchMap } from '../utils/use-match-map';
import { formatTime } from '~/features/common/utils/format-time';

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
    <div key={date}>
      <h3 className="text-center">{formatDate(date)}</h3>
      <div className="flex flex-col gap-2">
        {matches.map((match, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 px-2 py-4 rounded-lg text-[14px]"
          >
            <p className="font-bold">{formatTime(match.time)}</p>
            <p className="grow text-center">{getMatchLabel(match)}</p>
            <div className="flex">
              <Button Icon={PenIcon} onClick={onEditMatch(match)} ghost />
              <Button
                Icon={TrashIcon}
                onClick={onDeleteMatch(match.id)}
                ghost
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
}
