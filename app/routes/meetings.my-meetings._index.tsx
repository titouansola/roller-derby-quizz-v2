import { SignedIn } from '@clerk/remix';
import { LoaderFunctionArgs, defer } from '@remix-run/node';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { MyMeetings } from '~/features/meeting/components/MyMeetings';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { Layout } from '~/features/ui/layout/Layout';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const meetings = await meetingService.getUserMeetings(user.id);
  return defer({ meetings });
}

export default function Component() {
  const { t } = useTranslation();
  const { meetings } = useLoaderData<typeof loader>();
  return (
    <SignedIn>
      <Layout>
        <Link to=".." relative="path">
          <button className="btn">{t('meeting.all_meetings')}</button>
        </Link>
        <Suspense>
          <Await resolve={meetings}>
            {(res) => <MyMeetings meetings={res} />}
          </Await>
        </Suspense>
      </Layout>
    </SignedIn>
  );
}
