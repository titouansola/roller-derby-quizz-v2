import classNames from 'classnames';
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
          <Modal.TopRightAction>
            <button onClick={onClose}>
              <X />
            </button>
          </Modal.TopRightAction>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.TopRightAction = function ModalTopRightAction({
  children,
}: PropsWithChildren) {
  return <div className="absolute top-4 right-4">{children}</div>;
};

Modal.Title = function ModalTitle({ children }: PropsWithChildren) {
  return <h3 className="mb-4 font-bold">{children}</h3>;
};

Modal.Footer = function ModalFooter({
  children,
  layout = 'right',
}: PropsWithChildren<{ layout?: 'left' | 'center' | 'split' | 'right' }>) {
  return (
    <div
      className={classNames(
        `flex items-center mt-4 gap-2`,
        layout === 'left' && 'justify-start',
        layout === 'center' && 'justify-center',
        layout === 'split' && 'justify-between',
        layout === 'right' && 'justify-end'
      )}
    >
      {children}
    </div>
  );
};
