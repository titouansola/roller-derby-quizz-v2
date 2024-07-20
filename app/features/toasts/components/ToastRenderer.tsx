import { createPortal } from 'react-dom';
import { Toast } from '~/features/toasts/components/Toast';
import { useShowTimer } from '~/features/toasts/hooks/use-show-timer';
import { Toast as ToastType } from '../types/toast.type';

export function ToastRenderer({ toast }: { toast: ToastType }) {
  const show = useShowTimer(toast);
  //
  if (!show) {
    return null;
  }
  //
  return createPortal(<Toast toast={toast} />, document.body);
}
