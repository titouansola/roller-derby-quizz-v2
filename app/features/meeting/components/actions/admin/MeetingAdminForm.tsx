import { useFetcher } from '@remix-run/react';
import { TrashIcon } from 'lucide-react';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { MeetingAdminDto } from '~/features/meeting/types/meeting-admin-dto';

export function MeetingAdminForm({ admin }: { admin: MeetingAdminDto }) {
  const fetcher = useFetcher();
  return (
    <div className="flex items-center justify-between py-1">
      <p>{admin.derbyName}</p>
      {admin.role !== 'OWNER' && (
        <fetcher.Form method="POST">
          <input name="id" defaultValue={admin.id} hidden />
          <FetcherSubmitButton
            actionName="remove_admin"
            Icon={TrashIcon}
            fetcher={fetcher}
            ghost
          />
        </fetcher.Form>
      )}
    </div>
  );
}
