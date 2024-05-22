import { Link } from '@remix-run/react';
import { useState } from 'react';
import { ChevronLeftIcon, CircleCheckIcon, ShareIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { Toast } from '~/features/ui/layout/Toast';
import { Button } from '~/features/ui/components/Button';
import { RouteEnum } from '~/features/ui/enums/route-enum';

export function MeetingDetailsNavigationBar({
  meetingId,
}: {
  meetingId: number;
}) {
  const { t } = useTranslation();
  const [copyFlag, setCopyFlag] = useState(0);

  const onShare = async () => {
    const url = `${window.location.host}/meetings/details/${meetingId}`;
    await navigator.clipboard.writeText(url);
    setCopyFlag(Math.random());
  };

  return (
    <>
      <NavigationBar>
        <Link to=".." relative="path">
          <ChevronLeftIcon />
        </Link>
        <NavigationBar.Links>
          <NavigationBar.Link
            path={RouteEnum.MEETING_DETAILS}
            label="meeting.details"
          />
          <NavigationBar.Link
            path={RouteEnum.MEETING_MATCHES}
            label="meeting.matches"
          />
          <NavigationBar.Link
            path={RouteEnum.MEETING_REFEREES}
            label="meeting.referees"
          />
        </NavigationBar.Links>
        <Button Icon={ShareIcon} onClick={onShare} ghost />
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
