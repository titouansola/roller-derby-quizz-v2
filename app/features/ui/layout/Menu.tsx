import { useLocation, useNavigate } from '@remix-run/react';
import cx from 'classnames';
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
    <nav
      className={cx(
        // Common style
        '-order-1 bg-white flex border',
        // Large screen
        'md:h-fit md:flex-col md:mt-8 md:rounded-r-xl md:py-6 md:gap-4',
        // Little screen
        'max-md:fixed max-md:w-full max-md:bottom-0 max-md:px-4 max-md:rounded-t-xl max-md:justify-between max-md:text-[10px] max-md:h-[60px]'
      )}
    >
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
      className={cx(
        // Common style
        'flex items-center gap-1 opacity-50 border-transparent aria-current-page:opacity-100 aria-current-page:text-primary-active aria-current-page:font-bold aria-current-page:border-primary-active aria-current-page:bg-primary-background',
        // Large screen
        'md:border-r-2 md:p-4 md:w-full md:text-nowrap',
        // Little screen
        'max-md:flex-col max-md:w-[80px] max-md:h-full max-md:border-t-2 max-md:justify-center'
      )}
      aria-current={current ? 'page' : 'false'}
      role="link"
      onClick={onClick}
    >
      <Icon size={20} />
      {t(label)}
    </button>
  );
}
