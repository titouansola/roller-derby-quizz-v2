import { useFetcher } from '@remix-run/react';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { ListedUser } from '~/db/schemas';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { MeetingAdminDto } from '~/features/meeting/types/meeting-admin-dto';

export function UserSearch({
  meetingAdmins,
}: {
  meetingAdmins: MeetingAdminDto[];
}) {
  const fetcher = useFetcher<ListedUser[]>();
  const meetingAdminIds = meetingAdmins.map(({ userId }) => userId);
  //
  return (
    <>
      <fetcher.Form
        action="/users/search"
        className="flex items-stretch border rounded"
      >
        <input className="grow px-4 text-[14px]" name="search" />
        <Button Icon={SearchIcon} ghost />
      </fetcher.Form>

      {fetcher.data
        ?.filter(({ id }) => !meetingAdminIds.includes(id))
        .map((user) => (
          <div key={user.id}>
            <p>{user.derbyName}</p>
            <fetcher.Form method="POST">
              <input name="userId" defaultValue={user.id} hidden />
              <FetcherSubmitButton
                actionName="add_admin"
                Icon={PlusIcon}
                fetcher={fetcher}
                ghost
              />
            </fetcher.Form>
          </div>
        ))}
    </>
  );
}
