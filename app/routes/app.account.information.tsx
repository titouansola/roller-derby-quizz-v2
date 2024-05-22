import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { ProfileForm } from '~/features/users/components/ProfileForm';
import { profileValidator } from '~/features/users/form/profile-form';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  return json({ user });
}

export default function Component() {
  const { user } = useLoaderData<typeof loader>();
  return <ProfileForm user={user} />;
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getConnectedOrRedirect(args);
  const formData = await args.request.formData();
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
