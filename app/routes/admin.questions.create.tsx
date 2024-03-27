import { ActionFunctionArgs } from '@remix-run/node';
import { QuestionForm } from '~/features/questions/components/QuestionForm';
import { questionValidator } from '~/features/questions/question.form';
import { checkAuth } from '~/features/users/utils/check-auth.server';
import { questionService } from '~/features/questions/question-service.server';

export default function Component() {
  return <QuestionForm />;
}

export async function action(args: ActionFunctionArgs) {
  await checkAuth(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    throw new Error('BAD_REQUEST');
  }
  await questionService.create(data);
  return null;
}
