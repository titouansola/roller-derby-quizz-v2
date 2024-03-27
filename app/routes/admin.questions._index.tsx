import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { checkAuth } from '~/features/users/utils/check-auth.server';
import { questionService } from '~/features/questions/question-service.server';

export async function loader(args: LoaderFunctionArgs) {
  await checkAuth(args);
  const questions = await questionService.getAll();
  return json(questions);
}

export default function Component() {
  const questions = useLoaderData<typeof loader>();
  return (
    <>
      <Link to="create">
        <button>Add</button>
      </Link>
      <table>
        <thead>
          <tr>
            <td>Label</td>
            <td>Answers</td>
            <td>Explanations</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id!}>
              <td>{question.label}</td>
              <td>{question.answers.length}</td>
              <td>{question.explanations ? 'Yes' : 'No'}</td>
              <td>
                <Link to={question.id!.toString()}>See</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export async function action(args: LoaderFunctionArgs) {
  await checkAuth(args);
  const formData = await args.request.formData();
  switch (formData.get('_action')) {
    case 'DELETE':
      console.log(formData.get('id'));
      break;
  }
  return null;
}
