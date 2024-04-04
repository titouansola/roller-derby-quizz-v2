import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { LoaderFunctionArgs, defer, redirect } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import {
  ApplicationPosition,
  InsertApplication,
  RefereePosition,
} from '~/db/schemas';
import { userService } from '~/features/users/services/user.service.server';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingDetails } from '~/features/meeting/components/MeetingDetails';
import { applicationService } from '~/features/applications/services/application-service.server';
import { applicationFormValidator } from '~/features/applications/form/application-form';
import { ApplicationForm } from '~/features/applications/components/ApplicationForm';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect('/meetings');
  }
  const user = await userService.getCurrentUser(args);
  const meeting = meetingService.getMeetingById(id);
  const application = applicationService.findUserApplicationToMeeting(
    user.id,
    id
  );
  return defer({ meeting, application });
}

export default function Component() {
  const { meeting, application } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <Suspense>
        <Await resolve={meeting}>{(m) => <MeetingDetails meeting={m} />}</Await>
      </Suspense>
      <Suspense>
        <Await resolve={Promise.all([application, meeting])}>
          {([a, m]) => (
            <div>
              <h2>{t('meeting.apply_title')}</h2>
              <ApplicationForm application={a} meeting={m} />
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
  const insertApplication: InsertApplication = {
    id: data.id,
    meetingId: id,
    userId: user.id,
    notes: data.notes,
    matches: data.matches.map((v, i) => (v ? i : -1)).filter((i) => i >= 0),
    positions: Object.entries(data.positions).map<ApplicationPosition>(
      ([position, { value: interest, asGhost }]) => ({
        position: position as RefereePosition,
        interest,
        asGhost,
      })
    ),
  };
  if (!data.id) {
    await applicationService.create(insertApplication);
  } else {
    await applicationService.update(insertApplication);
  }
  return null;
}
