import { Logo } from '~/features/common/components/Logo';
import { Nav } from '~/features/landing-page/components/Nav';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className={'flex items-center gap-3'}>
        <Logo />
        <p className="font-bold text-[20px]">Roller Club</p>
      </div>
      <Nav />
    </header>
  );
}
