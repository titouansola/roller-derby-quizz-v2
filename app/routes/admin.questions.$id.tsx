import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QuestionForm } from '~/features/questions/components/QuestionForm';
import { questionValidator } from '~/features/questions/question.form';
import { questionService } from '~/features/questions/question-service.server';
import { userService } from '~/features/users/user.service.server';

function goBack() {
  return redirect('/admin/questions');
}

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const id = args.params.id!;
  const question = await questionService.get(parseInt(id));
  return !question ? goBack() : json(question);
}

export default function Component() {
  const question = useLoaderData<typeof loader>();
  return <QuestionForm question={question} />;
}

export async function action(args: ActionFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    throw new Error('BAD_REQUEST');
  }
  await questionService.update({ id: data.id!, ...data });
  return goBack();
}
