import { useOutletContext } from '@remix-run/react';
import { redirect } from '@remix-run/node';
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
import { toastService } from '~/features/toasts/services/toast.service.server';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { meetingPositionService } from '~/features/meeting-positions/services/meeting-position-service.server';
import { toInsertablePositions } from '~/features/meeting-positions/utils/meeting-positions-mapper';

export default function Component() {
  const { t } = useTranslation();
  const { meeting, meetingPositions } =
    useOutletContext<MeetingOutletContextData>();
  //
  return (
    <Layout>
      <section>
        <h2>{t('meeting.information')}</h2>
        <MeetingForm meeting={meeting} meetingPositions={meetingPositions} />
      </section>
      <section>
        <h2>{t('meeting.actions')}</h2>
        <MeetingActions meeting={meeting} />
      </section>
    </Layout>
  );
}

export const action = handleErrors(async (args) => {
  const user = await userService.getConnectedOrRedirect(args);
  const meetingId = parseInt(args.params.id ?? '0');
  if (!(meetingId > 0)) {
    return redirect(RouteEnum.MY_MEETINGS);
  }
  //
  const formData = await args.request.formData();
  const actionName = formData.get('_action');
  //
  switch (actionName) {
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
});

async function updateMeeting(formData: FormData) {
  const { data, error } = await meetingFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  const { positions, ...meeting } = data;
  const insertablePositions = toInsertablePositions(meeting.id!, positions);
  await meetingService.updateMeetingDetails(meeting);
  await meetingPositionService.updateMeetingPositions(
    meeting.id!,
    insertablePositions
  );
  return toastService.createResponseUpdatedToast();
}

async function addAdmin(meetingId: number, formData: FormData) {
  const userId = parseInt(formData.get('userId') as string);
  await meetingService.addMeetingAdmin(meetingId, userId);
  return toastService.createResponseWithToast({
    type: 'success',
    message: 'toast.meeting.admin_added',
  });
}

async function removeAdmin(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  await meetingService.removeMeetingAdmin(id);
  return toastService.createResponseWithToast({
    type: 'success',
    message: 'toast.meeting.admin_removed',
  });
}

async function publishMeeting(meetingId: number) {
  await meetingService.publishMeeting(meetingId);
  return toastService.createResponseUpdatedToast();
}

async function cancelMeeting(meetingId: number) {
  await meetingService.cancelMeeting(meetingId);
  return toastService.createResponseUpdatedToast();
}

async function deleteMeeting(meetingId: number) {
  await meetingService.deleteMeeting(meetingId);
  return redirect(RouteEnum.MY_MEETINGS, {
    headers: await toastService.putDeletedToast(),
  });
}
