import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { SearchMeetingDto } from '~/features/meeting/types/search-meeting-dto';
import { Button } from '~/features/ui/components/Button';

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
      <h1>{t('meeting.page_title')}</h1>
      <Link to="my-meetings">
        <Button label="meeting.my_meetings" />
      </Link>
      <Form>
        <div>
          <label htmlFor="location">{t('meeting.location')}</label>
          <input id="location" name="location" />
        </div>
        <Button label="search" />
      </Form>
      <div>
        {meetings.map((meeting) => (
          <Link key={meeting.id} to={`details/${meeting.id}`}>
            <div>
              <p>{meeting.title}</p>
              <p>
                {meeting.startDate}
                {!!meeting.endDate && ` - ${meeting.endDate}`}
              </p>
              <p>{meeting.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
