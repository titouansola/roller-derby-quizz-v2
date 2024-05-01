import { Form, useFetcher } from '@remix-run/react';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { UserDto } from '~/features/users/types';
import { MeetingAdminDto } from '../../types/meeting-admin-dto';

export function UserSearch({
  meetingAdmins,
}: {
  meetingAdmins: MeetingAdminDto[];
}) {
  const fetcher = useFetcher<UserDto[]>();
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
            <Form method="POST">
              <input name="userId" defaultValue={user.id} hidden />
              <FetcherSubmitButton
                actionName="add_admin"
                Icon={PlusIcon}
                ghost
              />
            </Form>
          </div>
        ))}
    </>
  );
}