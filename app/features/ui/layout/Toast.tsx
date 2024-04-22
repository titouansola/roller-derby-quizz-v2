import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function Toast({ hash, children }: PropsWithChildren<{ hash: number }>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hash !== 0) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [hash]);

  return (
    show &&
    createPortal(
      <div className="fixed bottom-0 w-full px-4 pb-8">
        <div className="bg-green-600 text-white p-4 rounded-xl">{children}</div>
      </div>,
      document.body
    )
  );
}
