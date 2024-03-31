import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { MeetingForm } from '~/features/meeting/components/MeetingForm';
import { meetingFormValidator } from '~/features/meeting/form/meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { userService } from '~/features/users/services/user.service.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    return redirect('/dashboard');
  }
  const meeting = await meetingService.getMeetingById(parseInt(id));
  return json(meeting);
}

export default function Component() {
  const meeting = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('meeting.create')}</h1>
      <MeetingForm meeting={meeting} />
    </>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const { data, error } = await meetingFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await meetingService.updateMeeting({
    ...data,
    id: data.id!,
    ownerId: user.id,
  });
  return redirect('/dashboard');
}
