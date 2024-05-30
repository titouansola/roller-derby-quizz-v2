import { json, redirect, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { QuestionForm } from '~/features/questions/components/QuestionForm';
import { questionValidator } from '~/features/questions/form/question-form';
import { questionService } from '~/features/questions/services/question-service.server';
import { toastService } from '~/features/toasts/services/toast.service.server';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const id = args.params.id!;
  const question = await questionService.get(parseInt(id));
  return !question ? redirect(RouteEnum.ADMIN_QUESTIONS) : json(question);
}

export default function Component() {
  const question = useLoaderData<typeof loader>();
  return <QuestionForm question={question} />;
}

export const action = handleErrors(async (args) => {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await questionService.update(data);
  return redirect(RouteEnum.ADMIN_QUESTIONS, {
    headers: await toastService.putUpdatedToast(),
  });
});
