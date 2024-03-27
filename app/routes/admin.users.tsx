import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { userService } from '~/features/users/user.service.server';
import { Role, UserMetadata } from '~/features/users/user-metadata.type';
import { hasRole } from '~/features/users/utils/has-role';
import { useTranslation } from 'react-i18next';

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
          const metadata = user.publicMetadata as UserMetadata | undefined;
          return (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{t(metadata?.role?.toLowerCase() ?? '')}</td>
              <td>
                {!hasRole(Role.SUPER_ADMIN, user) && (
                  <fetcher.Form method={'POST'}>
                    <input
                      type="text"
                      name="userId"
                      value={user.id}
                      readOnly
                      hidden
                    />
                    <button>{t('toggle_admin')}</button>
                  </fetcher.Form>
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
