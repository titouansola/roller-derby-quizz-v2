import { useState } from 'react';
import { Link, useFetcher } from '@remix-run/react';
import { AppliedPositionDto } from '../../types/applied-position-dto';

export function AppliedPosition({
  appliedPosition,
}: {
  appliedPosition: AppliedPositionDto;
}) {
  const fetcher = useFetcher();
  const [accepted, setAccepted] = useState(appliedPosition.accepted);
  const onTogglePosition = () => setAccepted(!accepted);
  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '2px 5px',
      }}
    >
      {appliedPosition.derbyName}
      {appliedPosition.asGhost && ' (ghost)'}
      <fetcher.Form method="POST">
        <input name="userId" defaultValue={appliedPosition.userId} hidden />
        <input name="position" defaultValue={appliedPosition.position} hidden />
        <input
          name="matchIndex"
          defaultValue={appliedPosition.matchIndex}
          type="number"
          hidden
        />
        <input
          name="asGhost"
          type="checkbox"
          defaultChecked={appliedPosition.asGhost}
          hidden
        />
        <button
          name="_action"
          value="toggle-position"
          onClick={onTogglePosition}
        >
          {accepted ? '(Accepted)' : '(OK)'}
        </button>
      </fetcher.Form>
      <Link to={`/profile/${appliedPosition.userId}`}>
        <button>(CV)</button>
      </Link>
    </div>
  );
}
