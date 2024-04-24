import { useLocation, useNavigate, useHref, Link } from '@remix-run/react';
import { ChevronLeft, CircleCheck, Share } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { Toast } from '~/features/ui/layout/Toast';

export function MeetingDetailsNavigationBar({
  meetingId,
}: {
  meetingId: number;
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const toDetails = useHref('details', { relative: 'path' });
  const toMatches = useHref('matches', { relative: 'path' });
  const toReferees = useHref('referees', { relative: 'path' });
  const details = location.pathname.match('/details') !== null;
  const matches = location.pathname.match('/matches') !== null;
  const referees = location.pathname.match('/referees') !== null;
  const [copyFlag, setCopyFlag] = useState(0);

  const onShare = async () => {
    const url = `${window.location.host}/meetings/details/${meetingId}`;
    await navigator.clipboard.writeText(url);
    setCopyFlag(Math.random());
  };

  const to = (path: string) => () => {
    if (location.pathname.match(path) === null) {
      navigate(path);
    }
  };

  return (
    <>
      <NavigationBar>
        <div className="flex items-center justify-between w-full">
          <Link to=".." relative="path">
            <ChevronLeft />
          </Link>
          <nav className="flex gap-2">
            <button
              className="btn sm"
              aria-current={details ? 'page' : 'false'}
              onClick={to(toDetails)}
            >
              {t('meeting.details')}
            </button>
            <button
              className="btn sm"
              aria-current={matches ? 'page' : 'false'}
              onClick={to(toMatches)}
            >
              {t('meeting.matches')}
            </button>
            <button
              className="btn sm"
              aria-current={referees ? 'page' : 'false'}
              onClick={to(toReferees)}
            >
              {t('meeting.referees')}
            </button>
          </nav>
          <button onClick={onShare}>
            <Share />
          </button>
        </div>
      </NavigationBar>
      <Toast hash={copyFlag}>
        <div className="flex gap-2">
          <CircleCheck />
          {t('meeting.copied')}
        </div>
      </Toast>
    </>
  );
}
