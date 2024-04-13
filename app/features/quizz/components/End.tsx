import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export function End({
  score,
  total,
  hardReset,
}: {
  score: number;
  total: number;
  hardReset: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  return (
    <div>
      <h3>{t('quizz.end')}</h3>
      <p>
        {t('score')} : {score} / {total}
      </p>
      <fetcher.Form method="POST">
        <button name="score" value={score} onClick={hardReset}>
          {t('quizz.restart')}
        </button>
      </fetcher.Form>
    </div>
  );
}
