import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs, defer } from '@remix-run/node';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { MyMeetings } from '~/features/meeting/components/MyMeetings';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { Button } from '~/features/ui/components/Button';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  const meetings = await meetingService.getUserMeetings(user.id);
  return defer({ meetings });
}

export default function Component() {
  const { meetings } = useLoaderData<typeof loader>();
  return (
    <SignedIn>
      <NavigationBar>
        <Link to=".." relative="path" className="block w-full">
          <Button label="meeting.all_meetings" full />
        </Link>
      </NavigationBar>
      <Layout>
        <Suspense>
          <Await resolve={meetings}>
            {(res) => <MyMeetings meetings={res} />}
          </Await>
        </Suspense>
      </Layout>
    </SignedIn>
  );
}