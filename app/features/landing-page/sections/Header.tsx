import { MenuIcon } from 'lucide-react';
import { Logo } from '~/features/common/components/Logo';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <p className="font-bold text-[20px]">Roller Club</p>
      <button>
        <MenuIcon />
      </button>
    </header>
  );
}
