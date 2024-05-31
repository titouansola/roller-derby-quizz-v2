import { PropsWithChildren } from 'react';
import { ColorClassName, colorClassnames } from '../constants/color-classnames';

export function Panel({
  color = 'dark',
  children,
}: PropsWithChildren<{ color?: ColorClassName }>) {
  return (
    <div
      className={`${colorClassnames[color]} px-4 py-6 rounded-2xl shadow-panel`}
    >
      {children}
    </div>
  );
}
