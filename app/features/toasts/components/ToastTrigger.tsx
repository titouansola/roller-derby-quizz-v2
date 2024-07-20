import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast as ToastType } from '~/features/toasts/types/toast.type';
import { useShowTimer } from '~/features/toasts/hooks/use-show-timer';
import { Toast } from '~/features/toasts/components/Toast';

export function ToastTrigger({
  children,
  successMessage,
  errorMessage,
}: {
  children: (success: () => void, error: () => void) => ReactNode;
  successMessage: string;
  errorMessage?: string;
}) {
  const [toast, setToast] = useState<ToastType | null>(null);
  const show = useShowTimer(toast);
  //
  const success = () => {
    setToast({ type: 'success', message: successMessage });
  };
  const error = () => {
    if (!!errorMessage) {
      setToast({ type: 'error', message: errorMessage });
    }
  };
  //
  return (
    <>
      {children(success, error)}
      {show && !!toast && createPortal(<Toast toast={toast} />, document.body)}
    </>
  );
}
