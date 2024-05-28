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
      <Input name="team1" label="meeting.match.team1" required />
      <Input name="team2" label="meeting.match.team2" required />
      <Date
        name="date"
        label="meeting.match_date"
        min={minDate}
        max={maxDate}
        required
      />
      <Input name="time" label="meeting.match.time" type="time" required />
    </fieldset>
  );
}
