import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Toast as ToastType } from '~/features/toasts/types/toast.type';

export function Toast({ toast }: { toast: ToastType }) {
  const { t } = useTranslation();
  //
  return (
    <div className="fixed left-0 bottom-20 w-full text-white font-semibold pointer-events-none">
      <p
        className={cx(
          'flex items-center gap-2 w-fit m-auto p-3 rounded animate-show-up',
          toast.type === 'success' && 'bg-success',
          toast.type === 'error' && 'bg-danger'
        )}
      >
        {toast.type === 'success' && <CheckCircleIcon size={18} />}
        {toast.type === 'error' && <XCircleIcon size={18} />}
        {t(toast.message)}
      </p>
    </div>
  );
}
