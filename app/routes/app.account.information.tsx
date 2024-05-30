import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { ForbiddenResponse } from '~/features/common/types/forbidden-response';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { toastService } from '~/features/toasts/services/toast.service.server';
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

export const action = handleErrors(async (args) => {
  const user = await userService.getConnectedOrRedirect(args);
  const formData = await args.request.formData();
  const { data, error } = await profileValidator.validate(formData);
  if (error || !data) {
    return validationError(error);
  }
  if (user.id !== data.id) {
    return new ForbiddenResponse();
  }
  await userService.update(data);
  return toastService.createResponseUpdatedToast();
});
