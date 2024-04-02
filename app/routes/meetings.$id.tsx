import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { LoaderFunctionArgs, defer, redirect } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import {
  ApplicationPosition,
  InsertApplication,
  SelectApplication,
} from '~/db/schemas';
import { applicationFormValidator } from '~/features/meeting/form/application-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { userService } from '~/features/users/services/user.service.server';
import { ApplicationForm } from '~/features/meeting/components/ApplicationForm';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect('/meetings');
  }
  const user = await userService.getCurrentUser(args);
  const meeting = meetingService.getMeetingById(id);
  const application = meetingService.findUserApplicationToMeeting(user.id, id);
  return defer({ meeting, application });
}

export default function Component() {
  const { meeting, application } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <Suspense>
        <Await resolve={meeting}>
          {(m) => (
            <div>
              <h1>{m.title}</h1>
              <p>{m.date}</p>
              <p>{m.location}</p>
              <p>{m.description}</p>
            </div>
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={application}>
          {(a) => (
            <div>
              <h2>{t('meeting.apply_title')}</h2>
              <ApplicationForm application={a} />
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
    meetingId: id,
    userId: user.id,
    notes: data.notes,
    status: 'PENDING',
    positions: Object.entries(data.positions).map<ApplicationPosition>(
      // @ts-expect-error flm
      ([position, interest]) => ({ position, interest })
    ),
  };
  if (!data.id) {
    await meetingService.addApplicationToMeeting(insertApplication);
  } else {
    const selectApplication: SelectApplication = {
      ...insertApplication,
      id: data.id,
      status: insertApplication.status!,
      notes: insertApplication.notes!,
    };
    await meetingService.updateApplication(selectApplication);
  }
  return null;
}
