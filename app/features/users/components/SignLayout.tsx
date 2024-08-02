import { PropsWithChildren } from 'react';

export function SignLayout({ children }: PropsWithChildren) {
  return <div className={'flex justify-center h-screen pt-10'}>{children}</div>;
}
