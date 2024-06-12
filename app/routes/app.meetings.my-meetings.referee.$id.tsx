import { LoaderFunctionArgs, defer, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { matchService } from '~/features/match/services/match-service.server';
import { MeetingDetails } from '~/features/meeting/components/MeetingDetails';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { RefereePositions } from '~/features/referee/components/RefereePositions';
import { refereeService } from '~/features/referee/services/referee.service.server';
import { Suspended } from '~/features/ui/components/Suspended';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect(RouteEnum.MY_MEETINGS);
  }
  const user = await userService.getConnectedOrRedirect(args);
  //
  const meeting = meetingService.getMeetingById(id);
  const matches = matchService.getMeetingMatches(id);
  const positions = refereeService.fetchMyPositions(user.id, id);
  //
  return defer({ meeting, matches, positions });
}

export default function Component() {
  const loaderData = useLoaderData<typeof loader>();
  //
  return (
    <>
      <Suspended
        resolve={Promise.all([loaderData.meeting, loaderData.matches])}
      >
        {([meeting, matches]) => (
          <MeetingDetails meeting={meeting} matches={matches} />
        )}
      </Suspended>
      <Suspended resolve={loaderData.positions}>
        {(positions) => <RefereePositions positions={positions} />}
      </Suspended>
    </>
  );
}
