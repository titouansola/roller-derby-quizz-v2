import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import cx from 'classnames';
import { Toast } from '../types/toast.type';

export function ToastRenderer({ toast }: { toast: Toast }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  //
  useEffect(() => {
    if (!!toast) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
        clearTimeout(timeout);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);
  //
  if (!show) {
    return null;
  }
  //
  return (
    <div className="fixed left-0 bottom-20 w-full text-white font-semibold pointer-events-none">
      <p
        className={cx(
          'flex items-center gap-2 w-fit m-auto p-3 rounded animate-show-up',
          toast.type === 'success' && 'bg-green-600',
          toast.type === 'error' && 'bg-red-600'
        )}
      >
        {toast.type === 'success' && <CheckCircleIcon size={18} />}
        {toast.type === 'error' && <XCircleIcon size={18} />}
        {t(toast.message)}
      </p>
    </div>
  );
}
