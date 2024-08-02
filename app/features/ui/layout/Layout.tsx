import { PropsWithChildren } from 'react';
import cx from 'classnames';

export function Layout({
  children,
  full,
  grow,
}: PropsWithChildren<{ full?: boolean; grow?: boolean }>) {
  return (
    <div className={cx('px-4 max-w-6xl', grow && 'grow', full && 'h-full')}>
      {children}
    </div>
  );
}
