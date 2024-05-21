import { LoaderFunctionArgs, defer, redirect } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { userService } from '~/features/users/services/user.service.server';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingDetails } from '~/features/meeting/components/MeetingDetails';
import { applicationService } from '~/features/applications/services/application-service.server';
import { ApplicationForm } from '~/features/applications/components/UserApplication/ApplicationForm';
import { matchService } from '~/features/match/services/match-service.server';
import { Layout } from '~/features/ui/layout/Layout';
import { applicationFormValidator } from '~/features/applications/form/application-form';
import { validationError } from 'remix-validated-form';
import { toInsertableApplication } from '~/features/applications/utils/application-mapper';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect('/meetings');
  }
  const meeting = meetingService.getMeetingById(id);
  const matches = matchService.getMeetingMatches(id);
  const application = userService
    .getUserId(args)
    .then((userId) =>
      userId ? applicationService.getMyApplicationToMeeting(userId, id) : null
    );
  const user = userService.getIfConnected(args);
  return defer({ meeting, application, matches, user });
}

export default function Component() {
  const loaderData = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <Suspense>
        <Await resolve={Promise.all([loaderData.meeting, loaderData.matches])}>
          {([meeting, matches]) => (
            <MeetingDetails meeting={meeting} matches={matches} />
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await
          resolve={Promise.all([
            loaderData.application,
            loaderData.meeting,
            loaderData.matches,
            loaderData.user,
          ])}
        >
          {([application, meeting, matches, user]) => (
            <Layout>
              <h2>{t('meeting.apply_title')}</h2>
              <ApplicationForm
                user={user}
                application={application}
                meeting={meeting}
                matches={matches}
              />
            </Layout>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export async function action(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect('/meetings');
  }
  const formData = await args.request.formData();
  const { error, data } = await applicationFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  const user = await userService.getIfConnected(args);
  if (
    !!user
      ? user.email !== data.email
      : await userService.isEmailInUse(data.email)
  ) {
    throw new Response('Unauthorized', { status: 401 });
  }
  //
  const userId = user?.id ?? (await userService.createOrUpdate(data));
  const { application, positions, availabilities } = toInsertableApplication(
    data,
    id,
    userId
  );
  //
  if (!data.id) {
    await applicationService.create(application, positions, availabilities);
  } else {
    await applicationService.update(application, positions, availabilities);
  }
  return null;
}
