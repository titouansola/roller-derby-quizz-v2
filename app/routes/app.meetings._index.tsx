import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { MeetingCard } from '~/features/meeting/components/MeetingCard';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { SearchMeetingDto } from '~/features/meeting/types/search-meeting-dto';
import { Button } from '~/features/ui/components/Button';
import { RouteEnum } from '~/features/ui/enums/route-enum';
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
  const { t } = useTranslation();
  //
  return (
    <>
      <NavigationBar>
        <Link to="my-meetings" className="block w-full">
          <Button label="meeting.my_meetings" full />
        </Link>
      </NavigationBar>
      <Layout>
        {/* TODO: use ValidatedForm */}
        <Form className="mb-8">
          <div className="form-control">
            <label htmlFor="location">{t('meeting.location')}</label>
            <input id="location" name="location" />
          </div>
        </Form>
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
    </>
  );
}
