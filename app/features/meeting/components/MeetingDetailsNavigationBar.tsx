import { useLocation, useNavigate, useHref, Link } from '@remix-run/react';
import { useState } from 'react';
import { ChevronLeftIcon, CircleCheckIcon, ShareIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { Toast } from '~/features/ui/layout/Toast';
import { Button } from '~/features/ui/components/Button';

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
            <ChevronLeftIcon />
          </Link>
          <nav className="flex gap-2">
            <Button
              label="meeting.details"
              aria-current={details ? 'page' : 'false'}
              onClick={to(toDetails)}
              small
            />
            <Button
              label="meeting.matches"
              aria-current={matches ? 'page' : 'false'}
              onClick={to(toMatches)}
              small
            />
            <Button
              label="meeting.referees"
              aria-current={referees ? 'page' : 'false'}
              onClick={to(toReferees)}
              small
            />
          </nav>
          <Button Icon={ShareIcon} onClick={onShare} ghost />
        </div>
      </NavigationBar>
      <Toast hash={copyFlag}>
        <div className="flex gap-2">
          <CircleCheckIcon />
          {t('meeting.copied')}
        </div>
      </Toast>
    </>
  );
}
