import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs, defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { MyMeetings } from '~/features/meeting/components/MyMeetings';
import { MyReferingMeetings } from '~/features/meeting/components/MyReferingMeetings';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { Button } from '~/features/ui/components/Button';
import { Suspended } from '~/features/ui/components/Suspended';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  const meetings = meetingService.getUserMeetings(user.id);
  const referingMeetings = meetingService.getUserMeetingsRefering(user.id);
  return defer({ meetings, referingMeetings });
}

export default function Component() {
  const { meetings, referingMeetings } = useLoaderData<typeof loader>();
  return (
    <SignedIn>
      <NavigationBar>
        <Link to=".." relative="path" className="block w-full">
          <Button label="meeting.all_meetings" full />
        </Link>
      </NavigationBar>
      <Layout>
        <div className="flex flex-col gap-10">
          <Suspended resolve={referingMeetings}>
            {(res) => <MyReferingMeetings meetings={res} />}
          </Suspended>
          <Suspended resolve={meetings}>
            {(res) => <MyMeetings meetings={res} />}
          </Suspended>
        </div>
      </Layout>
    </SignedIn>
  );
}
