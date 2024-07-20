import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { matchService } from '~/features/match/services/match-service.server';
import { meetingPositionService } from '~/features/meeting-positions/services/meeting-position-service.server';
import { MeetingDetailsNavigationBar } from '~/features/meeting/components/MeetingDetailsNavigationBar';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw new Error('Invalid meeting id');
  }
  await meetingService.doChecks(id, user.id, { acceptCancelled: true });
  //
  const [meeting, meetingPositions, meetingAdmins, matches] = await Promise.all(
    [
      meetingService.getMeetingById(id),
      meetingPositionService.getMeetingPositions(id),
      meetingService.getMeetingAdmins(id),
      matchService.getMeetingMatches(id),
    ]
  );
  return json<MeetingOutletContextData>({
    meeting,
    meetingPositions,
    meetingAdmins,
    matches,
  });
}

export default function Component() {
  const data = useLoaderData<typeof loader>();
  return (
    <SignedIn>
      <MeetingDetailsNavigationBar meeting={data.meeting} />
      <Outlet context={data} />
    </SignedIn>
  );
}
