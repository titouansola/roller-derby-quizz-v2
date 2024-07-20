import { useEffect, useState } from 'react';
import { Toast } from '~/features/toasts/types/toast.type';

export function useShowTimer(toast: Toast | null) {
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
  return show;
}
