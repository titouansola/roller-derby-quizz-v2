import { LoaderFunctionArgs, defer, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { ChevronLeftIcon } from 'lucide-react';
import { userService } from '~/features/users/services/user.service.server';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { MeetingDetails } from '~/features/meeting/components/MeetingDetails';
import { applicationService } from '~/features/applications/services/application-service.server';
import { ApplicationForm } from '~/features/applications/components/UserApplication/ApplicationForm';
import { matchService } from '~/features/match/services/match-service.server';
import { Layout } from '~/features/ui/layout/Layout';
import { applicationFormValidator } from '~/features/applications/form/application-form';
import { toInsertableApplication } from '~/features/applications/utils/application-mapper';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { fromApplicationToUser } from '~/features/users/utils/user-mapper';
import { Suspended } from '~/features/ui/components/Suspended';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { ForbiddenResponse } from '~/features/common/types/forbidden-response';
import { toastService } from '~/features/toasts/services/toast.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect(RouteEnum.MEETINGS);
  }
  const meeting = meetingService.getMeetingById(id);
  const matches = matchService.getMeetingMatches(id);
  const application = userService
    .getUserId(args)
    .then((userId) =>
      userId ? applicationService.getMyApplicationToMeeting(userId, id) : null
    );
  const user = userService.getIfConnected(args);
  return defer({ meeting, application, matches, user });
}

export default function Component() {
  const loaderData = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <NavigationBar>
        <Link to="../.." relative="path">
          <ChevronLeftIcon />
        </Link>
        <p className="grow font-semibold text-center">{t('meeting.details')}</p>
      </NavigationBar>
      {/*  */}
      <Suspended
        resolve={Promise.all([loaderData.meeting, loaderData.matches])}
      >
        {([meeting, matches]) => (
          <MeetingDetails meeting={meeting} matches={matches} />
        )}
      </Suspended>
      {/*  */}
      <Suspended
        resolve={Promise.all([
          loaderData.application,
          loaderData.meeting,
          loaderData.matches,
          loaderData.user,
        ])}
      >
        {([application, meeting, matches, user]) => (
          <Layout>
            <h2>{t('meeting.apply_title')}</h2>
            <ApplicationForm
              user={user}
              application={application}
              meeting={meeting}
              matches={matches}
            />
          </Layout>
        )}
      </Suspended>
    </>
  );
}

export const action = handleErrors(async (args) => {
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    throw redirect(RouteEnum.MEETINGS);
  }
  const formData = await args.request.formData();
  const { error, data } = await applicationFormValidator.validate(formData);
  if (!!error) {
    throw validationError(error);
  }
  const user = await userService.getIfConnected(args);
  if (
    !!user
      ? user.email !== data.email
      : await userService.isEmailInUse(data.email)
  ) {
    return new ForbiddenResponse();
  }
  //
  const userId =
    user?.id ?? (await userService.createOrUpdate(fromApplicationToUser(data)));
  const { application, positions, availabilities } = toInsertableApplication(
    data,
    id,
    userId
  );
  //
  if (!data.id) {
    await applicationService.create(application, positions, availabilities);
    return toastService.createResponseCreatedToast();
  } else {
    await applicationService.update(application, positions, availabilities);
    return toastService.createResponseUpdatedToast();
  }
});
