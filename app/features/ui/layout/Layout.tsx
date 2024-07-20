import cx from 'classnames';
import { PropsWithChildren } from 'react';

export function Layout({
  children,
  full,
  grow,
}: PropsWithChildren<{ full?: boolean; grow?: boolean }>) {
  return (
    <div className={cx('px-4', grow && 'grow', full && 'h-full')}>
      {children}
    </div>
  );
}
