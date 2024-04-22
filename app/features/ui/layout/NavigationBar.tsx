import { PropsWithChildren } from 'react';
import { Layout } from './Layout';

export function NavigationBar({ children }: PropsWithChildren) {
  return (
    <Layout>
      <div className="flex items-end h-[44px] mb-8">{children}</div>
    </Layout>
  );
}
