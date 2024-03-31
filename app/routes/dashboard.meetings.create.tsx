import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { MeetingForm } from '~/features/meeting/components/MeetingForm';
import { meetingFormValidator } from '~/features/meeting/form/meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { userService } from '~/features/users/services/user.service.server';

export default function Component() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('meeting.create')}</h1>
      <MeetingForm />
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
  await meetingService.createMeeting({ ...data, ownerId: user.id });
  return redirect('/dashboard');
}
