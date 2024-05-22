import { Outlet } from '@remix-run/react';
import { Menu } from '~/features/ui/layout/Menu';

export default function Component() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <main className="fixed h-full w-full top-0 grow overflow-auto pb-[81px] flex flex-col">
        <Outlet />
      </main>
      <Menu />
    </div>
  );
}
