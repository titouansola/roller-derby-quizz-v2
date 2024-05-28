import { useOutletContext } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { Layout } from '~/features/ui/layout/Layout';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { userService } from '~/features/users/services/user.service.server';
import { meetingFormValidator } from '~/features/meeting/form/meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingForm } from '~/features/meeting/components/MeetingForm';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { MeetingActions } from '~/features/meeting/components/actions/MeetingActions';

export default function Component() {
  const { t } = useTranslation();
  const { meeting } = useOutletContext<MeetingOutletContextData>();
  return (
    <Layout>
      <section>
        <h2>{t('meeting.information')}</h2>
        <MeetingForm meeting={meeting} />
      </section>
      <section>
        <h2>{t('meeting.actions')}</h2>
        <MeetingActions meeting={meeting} />
      </section>
    </Layout>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  const meetingId = parseInt(args.params.id ?? '0');
  if (!(meetingId > 0)) {
    return redirect(RouteEnum.MY_MEETINGS);
  }
  //
  const formData = await args.request.formData();
  const action = formData.get('_action');
  switch (action) {
    case 'update_meeting':
      await meetingService.doChecks(meetingId, user.id, { ownership: true });
      return updateMeeting(formData);
    case 'add_admin':
      await meetingService.doChecks(meetingId, user.id, { ownership: true });
      return addAdmin(meetingId, formData);
    case 'remove_admin':
      await meetingService.doChecks(meetingId, user.id, { ownership: true });
      return removeAdmin(formData);
    case 'publish_meeting':
      await meetingService.doChecks(meetingId, user.id, { ownership: true });
      return publishMeeting(meetingId);
    case 'cancel_meeting':
      await meetingService.doChecks(meetingId, user.id, {
        ownership: true,
        acceptCancelled: true,
      });
      return cancelMeeting(meetingId);
    case 'delete_meeting':
      await meetingService.doChecks(meetingId, user.id, {
        ownership: true,
        acceptCancelled: true,
      });
      return deleteMeeting(meetingId);
  }
  return null;
}

async function updateMeeting(formData: FormData) {
  const { data, error } = await meetingFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await meetingService.updateMeetingDetails(data);
  return null;
}

async function addAdmin(meetingId: number, formData: FormData) {
  const userId = parseInt(formData.get('userId') as string);
  await meetingService.addMeetingAdmin(meetingId, userId);
  return null;
}

async function removeAdmin(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  await meetingService.removeMeetingAdmin(id);
  return null;
}

async function publishMeeting(meetingId: number) {
  await meetingService.publishMeeting(meetingId);
  return null;
}

async function cancelMeeting(meetingId: number) {
  await meetingService.cancelMeeting(meetingId);
  return null;
}

async function deleteMeeting(meetingId: number) {
  await meetingService.deleteMeeting(meetingId);
  return redirect(RouteEnum.MY_MEETINGS);
}
