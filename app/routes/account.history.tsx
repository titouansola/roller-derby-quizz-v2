import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { HistoryVizualizer } from '~/features/user-history/components/HistoryVizualizer';
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
  //
  return (
    <>
      <h2>{t('account.minimal_skills_history')}</h2>
      <HistoryVizualizer history={history} />
    </>
  );
}
