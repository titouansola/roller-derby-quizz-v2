import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { userService } from '~/features/users/services/user.service.server';
import { HasRole } from '~/features/users/components/HasRole';
import { Button } from '~/features/ui/components/Button';
import { idFormValidator } from '~/features/common/form/id-form';
import { validationError } from 'remix-validated-form';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { toastService } from '~/features/toasts/services/toast.service.server';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsSuperAdmin(args);
  const users = await userService.getListedUsers();
  return json(users);
}

export default function Component() {
  const users = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { t } = useTranslation();
  //
  return (
    <table>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th>{t('role')}</th>
          <th>{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.civilName}</td>
              <td>{t(user.role.toLowerCase())}</td>
              <td>
                {user.role !== 'SUPER_ADMIN' && (
                  <HasRole userRole={'SUPER_ADMIN'}>
                    <fetcher.Form method={'POST'}>
                      <input
                        type="text"
                        name="id"
                        value={user.id}
                        readOnly
                        hidden
                      />
                      <Button label="toggle_admin" small />
                    </fetcher.Form>
                  </HasRole>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const action = handleErrors(async (args) => {
  await userService.currentUserIsSuperAdmin(args);
  const formData = await args.request.formData();
  const { data, error } = await idFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  await userService.toggleUserAdminRole(data.id);
  return toastService.createResponseWithToast({
    type: 'success',
    message: 'toast.admin.toggle',
  });
});
