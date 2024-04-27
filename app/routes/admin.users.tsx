import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { userService } from '~/features/users/services/user.service.server';
import { useTranslation } from 'react-i18next';
import { HasRole } from '~/features/users/components/HasRole';
import { Role } from '~/features/users/types';
import { Button } from '~/features/ui/components/Button';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsSuperAdmin(args);
  const users = await userService.getUsers();
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
          <td>{t('name')}</td>
          <td>{t('role')}</td>
          <td>{t('actions')}</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{t(user.role.toLowerCase())}</td>
              <td>
                {user.role !== Role.SUPER_ADMIN && (
                  <HasRole role={Role.SUPER_ADMIN}>
                    <fetcher.Form method={'POST'}>
                      <input
                        type="text"
                        name="userId"
                        value={user.id}
                        readOnly
                        hidden
                      />
                      <Button label="toggle_admin" />
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

export async function action(args: ActionFunctionArgs) {
  await userService.currentUserIsSuperAdmin(args);
  const formData = await args.request.formData();
  const userId = formData.get('userId') as string;
  if (!userId) {
    throw new Error('MALFORMED_REQUEST');
  }
  await userService.toggleUserAdminRole(userId);
  return null;
}
