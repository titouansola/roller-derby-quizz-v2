import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  defer,
  json,
  redirect,
} from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { SignedIn } from '@clerk/remix';
import { userService } from '~/features/users/services/user.service.server';
import { MeetingForm } from '~/features/meeting/components/MeetingForm';
import { meetingFormValidator } from '~/features/meeting/form/meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { applicationService } from '~/features/applications/services/application-service.server';
import { AllApplications } from '~/features/applications/components/AllApplications/AllApplications';
import { togglePositionFormValidator } from '~/features/applications/form/toggle-position-form';
import { UserDto } from '~/features/users/types';

export async function loader(args: LoaderFunctionArgs) {
  await userService.getCurrentUser(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    return redirect('/dashboard');
  }
  const [meeting, applications] = await Promise.all([
    meetingService.getMeetingById(id),
    applicationService.findMeetingApplications(id),
  ]);
  return json({ meeting, applications });
}

export default function Component() {
  const { meeting, applications } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  return (
    <SignedIn>
      <h1>{t('meeting.create')}</h1>
      <MeetingForm meeting={meeting} />
      <AllApplications applications={applications} meeting={meeting} />
    </SignedIn>
  );
}

export async function action(args: ActionFunctionArgs) {
  const meetingId = parseInt(args.params.id ?? '0');
  if (!(meetingId > 0)) {
    return redirect('/dashboard');
  }
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const action = formData.get('_action');
  switch (action) {
    case 'update':
      return updateMeeting(user, formData);
    case 'toggle-position':
      return togglePosition(meetingId, formData);
    default:
      return redirect('/dashboard');
  }
}

async function updateMeeting(user: UserDto, formData: FormData) {
  const { data, error } = await meetingFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await meetingService.update({ ...data, ownerId: user.id });
  return redirect('/dashboard');
}

async function togglePosition(meetingId: number, formData: FormData) {
  const { data, error } = await togglePositionFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await meetingService.updatePositions(meetingId, data);
  return null;
}
