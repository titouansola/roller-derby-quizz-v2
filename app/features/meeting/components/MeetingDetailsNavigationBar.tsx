import { Link } from '@remix-run/react';
import { ChevronLeftIcon, ShareIcon } from 'lucide-react';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { Button } from '~/features/ui/components/Button';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { ToastTrigger } from '~/features/toasts/components/ToastTrigger';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';

export function MeetingDetailsNavigationBar({
  meeting,
}: {
  meeting: MeetingDto;
}) {
  return (
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
      <ToastTrigger successMessage={'meeting.copied'}>
        {(triggerSuccessToast) => {
          const onShare = async () => {
            const url = `${window.location.host}/meetings/details/${meeting.id}`;
            await navigator.clipboard.writeText(url);
            triggerSuccessToast();
          };
          return (
            <Button
              Icon={ShareIcon}
              onClick={onShare}
              variant={'ghost'}
              disabled={!meeting.published || meeting.cancelled}
            />
          );
        }}
      </ToastTrigger>
    </NavigationBar>
  );
}
