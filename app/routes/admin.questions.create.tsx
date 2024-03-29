import { ActionFunctionArgs } from '@remix-run/node';
import { QuestionForm } from '~/features/questions/components/QuestionForm';
import { questionValidator } from '~/features/questions/question.form';
import { questionService } from '~/features/questions/question-service.server';
import { userService } from '~/features/users/user.service.server';

export default function Component() {
  return <QuestionForm />;
}

export async function action(args: ActionFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    throw new Error('BAD_REQUEST');
  }
  await questionService.create(data);
  return null;
}
