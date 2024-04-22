import { useOutletContext } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';
import { Layout } from '~/features/ui/layout/Layout';
import { userService } from '~/features/users/services/user.service.server';
import { meetingFormValidator } from '~/features/meeting/form/meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingForm } from '~/features/meeting/components/MeetingForm';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';

export default function Component() {
  const { meeting } = useOutletContext<MeetingOutletContextData>();
  return (
    <Layout grow>
      <MeetingForm meeting={meeting} />
    </Layout>
  );
}

export async function action(args: ActionFunctionArgs) {
  const meetingId = parseInt(args.params.id ?? '0');
  if (!(meetingId > 0)) {
    return redirect('/meetings/my-meetings');
  }
  await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const { data, error } = await meetingFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await meetingService.updateMeetingDetails(data);
  return null;
}
