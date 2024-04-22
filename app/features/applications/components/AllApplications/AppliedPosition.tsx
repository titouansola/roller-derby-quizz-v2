import { Link, useFetcher } from '@remix-run/react';
import { SelectApplicationPosition } from '~/db/schemas';
import { UserDto } from '~/features/users/types';

export function AppliedPosition({
  user,
  appliedPosition,
}: {
  user: UserDto;
  appliedPosition: SelectApplicationPosition;
}) {
  const fetcher = useFetcher();
  const accepted = appliedPosition.status === 'ACCEPTED';
  return (
    <div className="border rounded px-2 py-1">
      {user.derbyName}
      {appliedPosition.asGhost && ' (G)'}
      <fetcher.Form method="POST">
        <input name="id" defaultValue={appliedPosition.id} hidden />
        <input
          name="status"
          value={accepted ? 'PENDING' : 'ACCEPTED'}
          readOnly
          hidden
        />
        <button name="_action" value="toggle-position">
          {accepted ? '(Accepted)' : '(OK)'}
        </button>
      </fetcher.Form>
      <Link to={`/profile/${user.id}`}>
        <button>(CV)</button>
      </Link>
    </div>
  );
}
