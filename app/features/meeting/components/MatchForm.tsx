import { Input } from '~/features/ui/form/Input';

export function MatchForm({
  index,
  onRemove,
}: {
  index: number;
  onRemove: (index: number) => void;
}) {
  const baseName = `matches[${index}]`;
  return (
    <div>
      <h3>Match {index + 1}</h3>
      <Input name={`${baseName}.team1`} label="meeting.match.team1" />
      <Input name={`${baseName}.team2`} label="meeting.match.team2" />
      <Input name={`${baseName}.time`} label="meeting.match.time" type="time" />
      <Input name={`${baseName}.day`} label="meeting.match.day" type="number" />
      <div>
        <button type="button" onClick={() => onRemove(index)}>
          X
        </button>
      </div>
    </div>
  );
}
