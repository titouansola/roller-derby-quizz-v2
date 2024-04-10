import { Link, Outlet } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { userService } from '~/features/users/services/user.service.server';
import { HasRole } from '~/features/users/components/HasRole';
import { Role } from '~/features/users/types';

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
        <div>
          <Link to={'question-tags'}>{t('question_tags')}</Link>
        </div>
      </HasRole>
      <Outlet />
    </div>
  );
}
