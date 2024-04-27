import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/features/ui/components/Button';

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
        <Button
          label="quizz.restart"
          name="score"
          value={score}
          onClick={hardReset}
        />
      </fetcher.Form>
    </div>
  );
}
