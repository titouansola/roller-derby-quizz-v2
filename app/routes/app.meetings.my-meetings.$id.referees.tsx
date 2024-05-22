import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { Layout } from '~/features/ui/layout/Layout';
import { Button } from '~/features/ui/components/Button';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { applicationService } from '~/features/applications/services/application-service.server';
import { userService } from '~/features/users/services/user.service.server';
import { refereeService } from '~/features/referee/services/referee.service.server';
import {
  addRefereeFormValidator,
  refereePositionFormValidator,
} from '~/features/referee/form/add-referee-form';
import { acceptRefereeFormValidator } from '~/features/referee/form/accept-referee-form';
import { idFormValidator } from '~/features/common/form/id-form';
import { MeetingMatches } from '~/features/meeting/components/MeetingMatches';
import { ConnectedUser } from '~/db/schemas';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw new Error('Invalid meeting id');
  }
  const [referees, applications] = await Promise.all([
    refereeService.fetchMeetingReferees(id),
    applicationService.getMeetingApplications(id),
  ]);
  return json({ referees, applications });
}

export default function Component() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Link to={'../extract'} target="_blank" rel="noreferrer" className="mb-8">
        <Button label="meeting.extract" />
      </Link>
      <MeetingMatches
        applications={loaderData.applications}
        referees={loaderData.referees}
      />
    </Layout>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw new Error('Invalid meeting id');
  }
  await meetingService.doChecks(id, user.id);
  //
  const formData = await args.request.formData();
  const action = formData.get('_action') as string;
  //
  switch (action) {
    case 'add_referee':
      return addReferee(formData, id);
    case 'add_myself':
      return addMyself(formData, user, id);
    case 'accept_referee':
      return acceptReferee(formData, id);
    case 'remove_referee':
      return removeReferee(formData);
  }
  return null;
}

async function addReferee(formData: FormData, meetingId: number) {
  const { data, error } = await addRefereeFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  const userId = await userService.getOrCreate(data);
  await refereeService.create({ ...data, userId, meetingId });
  return null;
}

async function addMyself(
  formData: FormData,
  user: ConnectedUser,
  meetingId: number
) {
  const { data, error } = await refereePositionFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await refereeService.create({
    ...data,
    asGhost: false,
    userId: user.id,
    meetingId,
  });
  return null;
}

async function acceptReferee(formData: FormData, meetingId: number) {
  const { data, error } = await acceptRefereeFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await refereeService.create({ ...data, meetingId });
  return null;
}

async function removeReferee(formData: FormData) {
  const { data, error } = await idFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await refereeService.delete(data.id);
  return null;
}
