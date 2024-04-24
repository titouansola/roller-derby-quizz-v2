import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { SignedIn } from '@clerk/remix';
import { validationError } from 'remix-validated-form';
import { ProfileForm } from '~/features/users/components/ProfileForm';
import {
  profileValidator,
  transformProfileForm,
} from '~/features/users/form/profile-form';
import { userService } from '~/features/users/services/user.service.server';
import { Layout } from '~/features/ui/layout/Layout';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  return json({ user });
}

export default function Component() {
  const { user } = useLoaderData<typeof loader>();
  //
  return (
    <SignedIn>
      <Layout>
        <ProfileForm user={user} />
      </Layout>
    </SignedIn>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const { data, error } = await profileValidator.validate(formData);
  if (error || !data) {
    return validationError(error);
  }
  if (user.id !== data.id) {
    throw new Error('UNAUTHORIZED');
  }
  await userService.update(transformProfileForm(data));
  return null;
}
