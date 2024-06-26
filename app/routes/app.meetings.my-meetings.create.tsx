import { SignedIn } from '@clerk/remix';
import { redirect } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { MeetingForm } from '~/features/meeting/components/MeetingForm';
import { meetingFormValidator } from '~/features/meeting/form/meeting-form';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { toastService } from '~/features/toasts/services/toast.service.server';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { Layout } from '~/features/ui/layout/Layout';
import { userService } from '~/features/users/services/user.service.server';

export default function Component() {
  const { t } = useTranslation();
  return (
    <SignedIn>
      <Layout>
        <h2>{t('meeting.create')}</h2>
        <MeetingForm />
      </Layout>
    </SignedIn>
  );
}

export const action = handleErrors(async (args) => {
  const user = await userService.getConnectedOrRedirect(args);
  const formData = await args.request.formData();
  const { data, error } = await meetingFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await meetingService.create(data, user.id);
  return redirect(RouteEnum.MY_MEETINGS, {
    headers: await toastService.putCreatedToast(),
  });
});
