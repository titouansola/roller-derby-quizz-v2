import { Fetcher } from '@remix-run/react';
import classNames from 'classnames';
import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function FetcherSubmitButton({
  actionName,
  label,
  round,
  fetcher,
  uiAction,
  children,
}: PropsWithChildren<{
  actionName: string;
  label?: string;
  round?: boolean;
  fetcher?: Fetcher;
  uiAction?: () => void;
}>) {
  const { t } = useTranslation();
  //
  useEffect(() => {
    if (
      !!fetcher?.formAction &&
      fetcher?.formData?.get('_action') === actionName &&
      fetcher?.state === 'loading'
    ) {
      uiAction?.();
    }
  }, [fetcher, uiAction, actionName]);
  //
  return (
    <button
      className={classNames('btn', round && 'round')}
      name="_action"
      value={actionName}
    >
      {children ?? t(label ?? 'save')}
    </button>
  );
}
