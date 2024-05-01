import { Form } from '@remix-run/react';
import { TrashIcon } from 'lucide-react';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { MeetingAdminDto } from '../../types/meeting-admin-dto';

export function MeetingAdmin({ admin }: { admin: MeetingAdminDto }) {
  return (
    <div className="flex items-center justify-between py-1">
      <p>{admin.derbyName}</p>
      {admin.role !== 'OWNER' && (
        <Form method="POST">
          <input name="id" defaultValue={admin.id} hidden />
          <FetcherSubmitButton
            actionName="remove_admin"
            Icon={TrashIcon}
            ghost
          />
        </Form>
      )}
    </div>
  );
}
