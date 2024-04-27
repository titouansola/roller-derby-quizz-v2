import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useOutletContext } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { idFormValidator } from '~/features/common/form/id-form';
import { Layout } from '~/features/ui/layout/Layout';
import { AllApplications } from '~/features/applications/components/AllApplications/AllApplications';
import { manualApplicationFormValidator } from '~/features/applications/form/manual-application-form';
import { manualApplicationService } from '~/features/applications/services/manual-application-service.server';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { userService } from '~/features/users/services/user.service.server';
import { ApplicationStatus } from '~/db/schemas';
import { applicationService } from '~/features/applications/services/application-service.server';
import { Button } from '~/features/ui/components/Button';

export default function Component() {
  const { matches, applications, manualApplications } =
    useOutletContext<MeetingOutletContextData>();
  return (
    <>
      <Layout>
        <Link to={'../extract'} target="_blank" rel="noreferrer">
          <Button label="meeting.extract" />
        </Link>
        <AllApplications
          matches={matches}
          applications={applications}
          manualApplications={manualApplications}
        />
      </Layout>
    </>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw new Error('Invalid meeting id');
  }
  //
  await meetingService.checkUserRights(id, user.id);
  const formData = await args.request.formData();
  const action = formData.get('_action') as string;
  //
  switch (action) {
    case 'add_manual_application':
      return addManualApplication(id, formData);
    case 'update_manual_application':
      return updateManualApplication(id, formData);
    case 'delete_manual_application':
      return deleteManualApplication(formData);
    case 'accept_application':
      return updateApplicationStatus('ACCEPTED', formData);
    case 'reject_application':
      return updateApplicationStatus('REJECTED', formData);
  }
  return null;
}

async function addManualApplication(meetingId: number, formData: FormData) {
  const { data, error } =
    await manualApplicationFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  await manualApplicationService.create({
    meetingId,
    ...data,
    status: data.status ? 'ACCEPTED' : 'PENDING',
  });
  return null;
}

async function updateManualApplication(meetingId: number, formData: FormData) {
  const { data, error } =
    await manualApplicationFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  await manualApplicationService.update({
    meetingId,
    ...data,
    status: data.status ? 'ACCEPTED' : 'PENDING',
  });
  return null;
}

async function deleteManualApplication(formData: FormData) {
  const { data, error } = await idFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  await manualApplicationService.delete(data.id);
  return null;
}

async function updateApplicationStatus(
  status: ApplicationStatus,
  formData: FormData
) {
  const { data, error } = await idFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  await applicationService.updateStatus(data.id, status);
  return null;
}
