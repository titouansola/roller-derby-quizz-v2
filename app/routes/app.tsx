import { Outlet } from '@remix-run/react';
import { Menu } from '~/features/ui/layout/Menu';

export default function Component() {
  return (
    <div className="w-screen h-screen flex md:gap-4">
      <main className="max-md:fixed h-full w-full top-0 grow overflow-auto md:pb-8 max-md:pb-[81px] flex flex-col">
        <Outlet />
      </main>
      <Menu />
    </div>
  );
}
