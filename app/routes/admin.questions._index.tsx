import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { PenIcon, PlusIcon, XIcon } from 'lucide-react';
import { questionService } from '~/features/questions/services/question-service.server';
import { userService } from '~/features/users/services/user.service.server';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';

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
      <div className="flex justify-between">
        <h2>{t('questions')}</h2>
        <Link to="create">
          <Button Icon={PlusIcon} round />
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>{t('label')}</th>
            <th>{t('answers')}</th>
            <th>{t('explanations')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id!}>
              <td>{question.label}</td>
              <td>{question.answers.length}</td>
              <td>{t(question.explanations ? 'yes' : 'no')}</td>
              <td>
                <div className="flex gap-2 items-center">
                  <Link to={question.id.toString()}>
                    <Button Icon={PenIcon} ghost />
                  </Link>
                  <fetcher.Form method={'POST'}>
                    <input
                      name={'questionId'}
                      defaultValue={question.id}
                      hidden
                    />
                    <FetcherSubmitButton
                      Icon={XIcon}
                      actionName="DELETE"
                      aria-label={t('delete')}
                      ghost
                    />
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
