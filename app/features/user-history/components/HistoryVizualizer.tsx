import { SelectUserHistory } from '~/db/schemas';
import { ClientOnly } from '~/features/common/components/ClientOnly';
import { HistoryCharts } from './HistoryCharts.client';
import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { Button } from '~/features/ui/components/Button';
import { RouteEnum } from '~/features/ui/enums/route-enum';

export function HistoryVizualizer({
  history,
}: {
  history: SelectUserHistory[];
}) {
  const { t } = useTranslation();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8">
        <p>{t('account.no_history_available')}</p>
        <Link to={RouteEnum.MINIMAL_SKILLS}>
          <Button label="account.go_to_minimal_skills" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <ClientOnly>{() => <HistoryCharts history={history} />}</ClientOnly>
      </div>
      <p className="text-grey-dark">
        {t('account.minimal_skills_history_description')}
      </p>
    </>
  );
}
