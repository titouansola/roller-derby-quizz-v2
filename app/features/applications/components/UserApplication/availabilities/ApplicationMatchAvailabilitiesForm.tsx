import { MatchDto } from '~/features/match/types/match-dto';
import { getFullMatchLabel } from '~/features/match/utils/get-match-label';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { Input } from '~/features/ui/form/Input';

export function ApplicationMatchAvailabilitiesForm({
  matches,
}: {
  matches: MatchDto[];
}) {
  return matches.map((match, index) => {
    const baseName = `availabilities[${index}]`;
    return (
      <div key={match.id}>
        <Input name={`${baseName}.matchId`} hidden />
        <Checkbox
          name={`${baseName}.selected`}
          label={getFullMatchLabel(match)}
        />
      </div>
    );
  });
}
