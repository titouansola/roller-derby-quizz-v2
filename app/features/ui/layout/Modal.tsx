import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';
import cx from 'classnames';
import { Button } from '../components/Button';

export function Modal({
  children,
  onClose,
}: PropsWithChildren<{ onClose?: () => void }>) {
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-ghost-active backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white min-w-[300px] p-4 rounded-2xl shadow-xl">
        {!!onClose && (
          <Modal.TopRightAction>
            <Button onClick={onClose} Icon={XIcon} variant={'ghost'} round />
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
  return <div className="absolute top-2 right-4">{children}</div>;
};

Modal.Title = function ModalTitle({ children }: PropsWithChildren) {
  return <h3 className="pr-8">{children}</h3>;
};

Modal.Footer = function ModalFooter({
  children,
  layout = 'right',
}: PropsWithChildren<{ layout?: 'left' | 'center' | 'split' | 'right' }>) {
  return (
    <div
      className={cx(
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
