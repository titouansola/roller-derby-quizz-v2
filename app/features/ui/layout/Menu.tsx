import { useLocation, useNavigate } from '@remix-run/react';
import {
  UserIcon,
  CalendarIcon,
  BookIcon,
  LucideIcon,
  CogIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HasRole } from '~/features/users/components/HasRole';
import { RouteEnum } from '../enums/route-enum';

export function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const account = location.pathname.match(RouteEnum.ACCOUNT) !== null;
  const meetings = location.pathname.match(RouteEnum.MEETINGS) !== null;
  const minimalSkills =
    location.pathname.match(RouteEnum.MINIMAL_SKILLS) !== null;
  const admin = location.pathname.match(RouteEnum.ADMIN) !== null;

  const to = (path: string) => () => {
    if (location.pathname.match(path) === null) {
      navigate(path);
    }
  };

  return (
    <nav className="fixed w-full bottom-0 px-4 bg-gray-50 rounded-t-xl flex justify-between text-[10px] h-[49px]">
      <MenuButton
        label="menu.account"
        current={account}
        Icon={UserIcon}
        onClick={to(RouteEnum.ACCOUNT_INFORMATION)}
      />
      <MenuButton
        label="menu.meetings"
        current={meetings}
        Icon={CalendarIcon}
        onClick={to(RouteEnum.MEETINGS)}
      />
      <MenuButton
        label="menu.minimal_skills"
        current={minimalSkills}
        Icon={BookIcon}
        onClick={to(RouteEnum.MINIMAL_SKILLS)}
      />
      <HasRole userRole={'ADMIN'}>
        <MenuButton
          label="menu.admin"
          current={admin}
          Icon={CogIcon}
          onClick={to(RouteEnum.ADMIN_QUESTIONS)}
        />
      </HasRole>
    </nav>
  );
}

function MenuButton({
  label,
  current,
  Icon,
  onClick,
}: {
  label: string;
  current: boolean;
  Icon: LucideIcon;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <button
      className="flex flex-col items-center justify-center gap-1 h-full w-[80px] opacity-50 aria-current-page:opacity-100 border-t-2 border-transparent aria-current-page:border-black"
      aria-current={current ? 'page' : 'false'}
      role="link"
      onClick={onClick}
    >
      <Icon size={20} />
      {t(label)}
    </button>
  );
}
