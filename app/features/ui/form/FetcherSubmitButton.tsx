import { Fetcher, useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function FetcherSubmitButton({
  actionName,
  label,
  fetcher,
  uiAction,
}: {
  actionName: string;
  label?: string;
  fetcher?: Fetcher;
  uiAction?: () => void;
}) {
  const { t } = useTranslation();
  //
  useEffect(() => {
    if (!!fetcher?.formAction && fetcher?.state === 'loading') {
      uiAction?.();
    }
  }, [fetcher, uiAction]);
  return (
    <button type="submit" name="_action" value={actionName}>
      {t(label ?? 'save')}
    </button>
  );
}
