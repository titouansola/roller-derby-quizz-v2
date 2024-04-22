import { X } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  children,
  onClose,
}: PropsWithChildren<{ onClose?: () => void }>) {
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white min-w-[300px] p-4 border border-gray-300 rounded-2xl shadow-xl">
        {!!onClose && (
          <button className="reset absolute top-4 right-4" onClick={onClose}>
            <X />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
