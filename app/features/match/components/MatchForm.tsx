import { Date } from '~/features/ui/form/Date';
import { Input } from '~/features/ui/form/Input';

export function MatchForm({
  minDate,
  maxDate,
}: {
  minDate: string;
  maxDate: string;
}) {
  return (
    <fieldset>
      <Input name="id" hidden />
      <Input name="team1" label="meeting.match.team1" />
      <Input name="team2" label="meeting.match.team2" />
      <Date
        name="date"
        label="meeting.match.date"
        min={minDate}
        max={maxDate}
      />
      <Input name="time" label="meeting.match.time" type="time" />
    </fieldset>
  );
}
