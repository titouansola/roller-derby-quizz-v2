import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { questionService } from '~/features/questions/question-service.server';
import { userService } from '~/features/users/user.service.server';
import { useTranslation } from 'react-i18next';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const questions = await questionService.getAll();
  return json(questions);
}

export default function Component() {
  const questions = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { t } = useTranslation();
  //
  return (
    <>
      <Link to="create">
        <button>{t('add_question')}</button>
      </Link>
      <table>
        <thead>
          <tr>
            <td>{t('label')}</td>
            <td>{t('answers')}</td>
            <td>{t('explanations')}</td>
            <td>{t('actions')}</td>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id!}>
              <td>{question.label}</td>
              <td>{question.answers.length}</td>
              <td>{t(question.explanations ? 'yes' : 'no')}</td>
              <td>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Link to={question.id.toString()}>
                    <button>{t('details')}</button>
                  </Link>
                  <fetcher.Form method={'POST'}>
                    <input
                      name={'questionId'}
                      value={question.id}
                      readOnly
                      hidden
                    />
                    <button
                      name="_action"
                      value="DELETE"
                      aria-label={t('delete')}
                    >
                      x
                    </button>
                  </fetcher.Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export async function action(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  const action = formData.get('_action');
  const questionId = parseInt(formData.get('questionId') as string);
  //
  if (!action || !questionId || isNaN(questionId)) {
    throw new Error('MALFORMED_REQUEST');
  }
  switch (action) {
    case 'DELETE':
      await questionService.delete(questionId);
      break;
  }
  return null;
}
