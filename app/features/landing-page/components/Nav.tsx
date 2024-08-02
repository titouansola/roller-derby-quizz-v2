import { Link } from '@remix-run/react';
import { SignedIn, SignedOut } from '@clerk/remix';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BookIcon,
  CalendarIcon,
  CogIcon,
  LucideIcon,
  MenuIcon,
  UserIcon,
} from 'lucide-react';
import cx from 'classnames';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { HasRole } from '~/features/users/components/HasRole';

export function Nav() {
  const menuRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!!menuRef.current) {
      menuRef.current.classList.toggle('max-md:hidden');
    }
  };

  return (
    <div className={'flex items-center'}>
      <button className={'md:hidden'} onClick={onClick}>
        <MenuIcon />
      </button>

      <div className={'flex items-center relative'}>
        <div
          ref={menuRef}
          className={cx(
            // Common style
            'flex bg-light w-max rounded',
            // Large screen
            'md:items-center md:gap-8',
            // Small screen
            'max-md:absolute max-md:flex-col max-md:gap-4 max-md:right-0 max-md:top-full max-md:translate-y-4 max-md:p-3 max-md:pr-6 max-md:border max-md:border-light-alt max-md:shadow max-md:hidden'
          )}
        >
          <SignedIn>
            <NavLink
              path={RouteEnum.ACCOUNT}
              label={'menu.account'}
              Icon={UserIcon}
            />
          </SignedIn>
          <SignedOut>
            <NavLink
              path={RouteEnum.SIGN_IN}
              label={'menu.sign_in'}
              Icon={UserIcon}
            />
          </SignedOut>
          <NavLink
            path={RouteEnum.MEETINGS}
            label={'menu.meetings'}
            Icon={CalendarIcon}
          />
          <NavLink
            path={RouteEnum.MINIMAL_SKILLS}
            label={'menu.minimal_skills'}
            Icon={BookIcon}
          />
          <HasRole userRole={'ADMIN'}>
            <NavLink
              path={RouteEnum.ADMIN}
              label={'menu.admin'}
              Icon={CogIcon}
            />
          </HasRole>
          <NavLink path={RouteEnum.ABOUT} label={'menu.about'} />
        </div>
      </div>
    </div>
  );
}

function NavLink({
  path,
  label,
  Icon,
}: {
  path: RouteEnum;
  label: string;
  Icon?: LucideIcon;
}) {
  const { t } = useTranslation();
  return (
    <Link
      className={
        'flex items-center gap-2 text-[14px] hover:text-primary-active'
      }
      to={path}
    >
      {!!Icon && <Icon size={18} />}
      {t(label)}
    </Link>
  );
}
