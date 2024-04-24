import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { LoaderFunctionArgs, defer, redirect } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { InsertApplication } from '~/db/schemas';
import { userService } from '~/features/users/services/user.service.server';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingDetails } from '~/features/meeting/components/MeetingDetails';
import { applicationService } from '~/features/applications/services/application-service.server';
import {
  applicationFormValidator,
  transformApplicationForm,
} from '~/features/applications/form/application-form';
import { ApplicationForm } from '~/features/applications/components/UserApplication/ApplicationForm';
import { matchService } from '~/features/match/services/match-service.server';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect('/meetings');
  }
  const user = await userService.getCurrentUser(args);
  const meeting = meetingService.getMeetingById(id);
  const matches = await matchService.getMeetingMatches(id);
  const application = applicationService.getUserApplicationToMeeting(
    user.id,
    id
  );
  return defer({ meeting, application, matches });
}

export default function Component() {
  const { meeting, application, matches } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <Suspense>
        <Await resolve={Promise.all([meeting, matches])}>
          {([me, ma]) => <MeetingDetails meeting={me} matches={ma} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={Promise.all([application, meeting, matches])}>
          {([a, me, ma]) => (
            <div>
              <h2>{t('meeting.apply_title')}</h2>
              <ApplicationForm userApplication={a} meeting={me} matches={ma} />
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export async function action(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect('/meetings');
  }
  const formData = await args.request.formData();
  const { error, data } = await applicationFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  const { application, positions } = transformApplicationForm(data);
  const insertApplication: InsertApplication = {
    ...application,
    userId: user.id,
    meetingId: id,
  };
  if (!application.id) {
    await applicationService.create(insertApplication, positions);
  } else {
    await applicationService.update(insertApplication, positions);
  }
  return null;
}
