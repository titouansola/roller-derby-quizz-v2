import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { applicationService } from '~/features/applications/services/application-service.server';
import { manualApplicationService } from '~/features/applications/services/manual-application-service.server';
import { matchService } from '~/features/match/services/match-service.server';
import { MeetingDetailsNavigationBar } from '~/features/meeting/components/MeetingDetailsNavigationBar';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw new Error('Invalid meeting id');
  }
  await meetingService.doChecks(id, user.id, { acceptCancelled: true });
  //
  const [meeting, meetingAdmins, applications, manualApplications, matches] =
    await Promise.all([
      meetingService.getMeetingById(id),
      meetingService.getMeetingAdmins(id),
      applicationService.getMeetingApplications(id),
      manualApplicationService.getMeetingManualApplications(id),
      matchService.getMeetingMatches(id),
    ]);
  //
  return json<MeetingOutletContextData>({
    meeting,
    meetingAdmins,
    applications,
    manualApplications,
    matches,
  });
}

export default function Component() {
  const data = useLoaderData<typeof loader>();
  return (
    <SignedIn>
      <MeetingDetailsNavigationBar meetingId={data.meeting.id} />
      <Outlet context={data} />
    </SignedIn>
  );
}
