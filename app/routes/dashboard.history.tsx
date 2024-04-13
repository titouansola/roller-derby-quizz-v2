import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { userHistoryService } from '~/features/user-history/services/user-history-service.server';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const history = await userHistoryService.getUserHistory(user.id);
  return json(history);
}

export default function Component() {
  const { t } = useTranslation();
  const history = useLoaderData<typeof loader>();
  return (
    <>
      <h1>{t('userHistory')}</h1>
      <ul>
        {history.map((record) => (
          <li key={record.id}>
            {record.date} {record.score}
          </li>
        ))}
      </ul>
    </>
  );
}
