import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { MeetingCard } from '~/features/meeting/components/MeetingCard';
import { searchMeetingFormValidator } from '~/features/meeting/form/search-meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { SearchMeetingDto } from '~/features/meeting/types/search-meeting-dto';
import { Button } from '~/features/ui/components/Button';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { Input } from '~/features/ui/form/Input';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const params: SearchMeetingDto = {
    location: searchParams.get('location'),
  };
  const meetings = await meetingService.searchMeetings(params);
  return json(meetings);
}

export default function Component() {
  const meetings = useLoaderData<typeof loader>();
  //
  return (
    <div className={'mt-8'}>
      <NavigationBar>
        <Link to="my-meetings" className="block w-full">
          <Button label="meeting.my_meetings" full />
        </Link>
      </NavigationBar>
      <Layout>
        <ValidatedForm className="mb-8" validator={searchMeetingFormValidator}>
          <Input name="location" label="meeting.location" />
        </ValidatedForm>
        <div>
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              path={`${RouteEnum.MEETING_DETAILS}/${meeting.id}`}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
}
