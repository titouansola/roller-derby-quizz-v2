import { Fetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { Button, ButtonProps } from '../components/Button';

type FetcherSubmitButtonProps = ButtonProps & {
  actionName: string;
  fetcher?: Fetcher;
  uiAction?: () => void;
};

export function FetcherSubmitButton({
  actionName,
  label,
  Icon,
  fetcher,
  uiAction,
  ...buttonProps
}: FetcherSubmitButtonProps) {
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
    <Button
      name="_action"
      label={!label ? label : !Icon ? 'save' : undefined}
      Icon={Icon}
      value={actionName}
      {...buttonProps}
    />
  );
}
