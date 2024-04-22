import { useLocation, useNavigate } from '@remix-run/react';
import { User, Calendar, Book, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Menu() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const account = location.pathname.match('/account') !== null;
  const meetings = location.pathname.match('/meetings') !== null;
  const minimalSkills = location.pathname.match('/minimal-skills') !== null;
  const home = !account && !meetings && !minimalSkills;

  const to = (path: string) => () => {
    if (location.pathname.match(path) === null) {
      navigate(path);
    }
  };

  return (
    <nav className="mobile-menu">
      <button
        className="reset"
        aria-current={home ? 'page' : 'false'}
        onClick={to('/')}
      >
        <Home size={20} />
        <p>{t('menu.home')}</p>
      </button>
      <button
        className="reset"
        aria-current={account ? 'page' : 'false'}
        onClick={to('/account')}
      >
        <User size={20} />
        <p>{t('menu.account')}</p>
      </button>
      <button
        className="reset"
        aria-current={meetings ? 'page' : 'false'}
        onClick={to('/meetings')}
      >
        <Calendar size={20} />
        <p>{t('menu.meetings')}</p>
      </button>
      <button
        className="reset"
        aria-current={minimalSkills ? 'page' : 'false'}
        onClick={to('/minimal-skills')}
      >
        <Book size={20} />
        <p>{t('menu.minimal_skills')}</p>
      </button>
    </nav>
  );
}
