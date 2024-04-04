import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { ActionFunctionArgs, LoaderFunctionArgs, defer } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { Profile } from '~/features/users/components/Profile';
import { Experiences } from '~/features/experience/components/Experiences';
import { UserDto } from '~/features/users/types';

import { profileValidator } from '~/features/users/form/profile-form';

import { userService } from '~/features/users/services/user.service.server';
import { experienceService } from '~/features/experience/services/experience-service.server';
import { MyMeetings } from '~/features/meeting/components/MyMeetings';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { SignedIn } from '@clerk/remix';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const experiences = experienceService.getUserDerbyCV(user.id);
  const meetings = meetingService.getUserMeetings(user.id);
  return defer({
    user,
    experiences,
    meetings,
  });
}

export default function Component() {
  const { user, experiences, meetings } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <SignedIn>
      <div>
        <h2>{t('dashboard.profile')}</h2>
        <Profile user={user} />
        <h2>{t('dashboard.derby_cv')}</h2>
        <Suspense>
          <Await resolve={experiences}>
            {(res) => <Experiences experiences={res} />}
          </Await>
        </Suspense>
        <h2>{t('dashboard.meetings')}</h2>
        <Suspense>
          <Await resolve={meetings}>
            {(res) => <MyMeetings meetings={res} />}
          </Await>
        </Suspense>
      </div>
    </SignedIn>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const action = formData.get('_action');
  if (!action) {
    throw new Error('MALFORMED_REQUEST');
  }
  switch (action) {
    case 'save-profile':
      return updateProfile(user, formData);
  }
}

async function updateProfile(user: UserDto, formData: FormData) {
  const { data, error } = await profileValidator.validate(formData);
  if (error || !data) {
    return validationError(error);
  }
  if (user.id !== data.id) {
    throw new Error('UNAUTHORIZED');
  }
  await userService.update(data);
  return null;
}
