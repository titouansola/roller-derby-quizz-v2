import { useState } from 'react';
import { Match } from '~/db/schemas';
import { ApplicationPositionsForm } from './ApplicationPositionsForm';

export function MatchApplicationForm({
  match,
  matchIndex,
  defaultChecked,
}: {
  match: Match;
  matchIndex: number;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = `match-${matchIndex}`;
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
      {checked && <ApplicationPositionsForm matchIndex={matchIndex} />}
    </>
  );
}
