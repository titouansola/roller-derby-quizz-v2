import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionFunctionArgs, LoaderFunctionArgs, defer } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Profile } from '~/features/users/components/Profile';
import { userService } from '~/features/users/services/user.service.server';
import { profileValidator } from '~/features/users/form/profile-form';
import { UserDto } from '~/features/users/types';
import { experienceService } from '~/features/experience/services/experience-service.server';
import { Experiences } from '~/features/experience/components/Experiences';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const experiences = experienceService.getUserDerbyCV(user.id);
  return defer({
    user,
    experiences,
  });
}

export default function Component() {
  const { user, experiences } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <div>
        <h2>{t('dashboard.profile')}</h2>
        <Profile user={user} />
        <h2>{t('dashboard.derby_cv')}</h2>
        <Suspense>
          <Await resolve={experiences}>
            {(res) => <Experiences experiences={res} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  const action = formData.get('_action');
  if (!action) {
    throw new Error('MALFORMED_REQUEST');
  }
  //
  const user = await userService.getCurrentUser(args);
  switch (action) {
    case 'save-profile':
      return updateProfile(user, formData);
  }
}

async function updateProfile(user: UserDto, formData: FormData) {
  const { data, error } = await profileValidator.validate(formData);
  if (error || !data) {
    throw new Error('MALFORMED_REQUEST');
  }
  if (user.id !== data.id) {
    throw new Error('UNAUTHORIZED');
  }
  await userService.updateUser(data);
  return null;
}
