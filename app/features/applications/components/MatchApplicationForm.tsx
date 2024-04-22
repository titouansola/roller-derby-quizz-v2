import { useState } from 'react';
import { ApplicationPositionsForm } from './ApplicationPositionsForm';
import { MatchDto } from '~/features/match/types/match-dto';

export function MatchApplicationForm({
  match,
  defaultChecked,
}: {
  match: MatchDto;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = `match-${match.id}`;
  return (
    <>
      <div>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor={id}>
          {match.team1} vs {match.team2}
        </label>
      </div>
      {checked && <ApplicationPositionsForm matchId={match.id} />}
    </>
  );
}
