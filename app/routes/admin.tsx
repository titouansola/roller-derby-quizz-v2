import { Link, Outlet } from '@remix-run/react';
import { userService } from '~/features/users/user.service.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { HasRole } from '~/features/users/components/HasRole';
import { Role } from '~/features/users/user-metadata.type';
import { useTranslation } from 'react-i18next';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  return null;
}

export default function Component() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('admin')}</h1>
      <HasRole role={Role.SUPER_ADMIN}>
        <div>
          <Link to={'users'}>{t('users')}</Link>
        </div>
        <div>
          <Link to={'questions'}>{t('questions')}</Link>
        </div>
      </HasRole>
      <Outlet />
    </div>
  );
}
