import { zfd } from 'zod-form-data';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Runner } from '~/features/quizz/components/Runner';
import { questionService } from '~/features/questions/services/question-service.server';
import { userService } from '~/features/users/services/user.service.server';
import { userHistoryService } from '~/features/user-history/services/user-history-service.server';

export async function loader() {
  const questions = await questionService.buildQuizz();
  return json(questions);
}

export default function Component() {
  const questions = useLoaderData<typeof loader>();

  if (questions.length === 0) {
    return <div>No question available!</div>;
  }

  return (
    <main>
      <Runner questions={questions} />
    </main>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const score = zfd.numeric().parse(formData.get('score'));
  await userHistoryService.addUserHistory({
    userId: user.id,
    date: new Date().toDateString(),
    score,
  });
  return null;
}
