import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { CheckboxGroup } from '~/features/ui/form/CheckboxGroup';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function ApplicationMatchesForm({ meeting }: { meeting: MeetingDto }) {
  return (
    <CheckboxGroup name="matches" label="meeting.matches">
      {meeting.matches.map((match, index) => (
        <Checkbox
          key={index}
          name={`matches.${index}`}
          label={`${match.team1} vs ${match.team2}`}
        />
      ))}
    </CheckboxGroup>
  );
}
