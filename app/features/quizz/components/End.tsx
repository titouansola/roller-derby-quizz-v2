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
  return (
    <div>
      <h3>{t('quizz.end')}</h3>
      <p>
        {t('score')} : {score} / {total}
      </p>
      <button onClick={hardReset}>{t('quizz.restart')}</button>
    </div>
  );
}
