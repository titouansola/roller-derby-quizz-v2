import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { questionService } from '~/features/questions/services/question-service.server';
import { Layout } from '~/features/ui/layout/Layout';
import {
  MinimalSkillsSession,
  commitMinimalSkillsSession,
  destroyMinimalSkillsSession,
  getMinimalSkillsSession,
} from '~/features/minimal-skills/session/minimal-skills-session';
import { MinimalSkillsForm } from '~/features/minimal-skills/components/MinimalSkillsForm';
import { minimalSkillsFormValidator } from '~/features/minimal-skills/form/minimal-skills-form';
import { Button } from '~/features/ui/components/Button';
import { RestartModal } from '~/features/minimal-skills/components/RestartModal';
import { RouteEnum } from '~/features/ui/enums/route-enum';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getMinimalSkillsSession(request.headers.get('Cookie'));
  //
  if (!!session.data.count && session.data.count > 50) {
    return redirect(RouteEnum.MINIMAL_SKILLS_RESULTS);
  }
  //
  if (!session.data.question) {
    const previousQuestionIds = session.data.previousQuestionIds ?? [];
    const question = await questionService.getRandom(previousQuestionIds);
    if (!question) {
      return redirect(RouteEnum.MINIMAL_SKILLS_RESULTS);
    }
    session.set('question', question);
    session.set('previousQuestionIds', previousQuestionIds.concat(question.id));
  }
  //
  session.set('count', session.data.count ?? 1);
  session.set('score', session.data.score ?? 0);
  session.set('isRight', session.data.isRight ?? null);
  //
  return json(session.data, {
    headers: { 'Set-Cookie': await commitMinimalSkillsSession(session) },
  });
}

export default function Component() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();
  const [showRestartModal, setShowRestartModal] = useState(false);
  const toggleRestartModal = () => setShowRestartModal((prev) => !prev);
  //
  const { question, count } = data;
  const isRight = data.isRight ?? null;
  //
  if (!question) {
    return null;
  }
  return (
    <Layout>
      <div className="py-4">
        <div className="absolute right-0 top-2">
          <Button Icon={RefreshCwIcon} onClick={toggleRestartModal} ghost />
          <RestartModal show={showRestartModal} close={toggleRestartModal} />
        </div>
        <p className="text-center text-sm text-gray-400">{count} / 50</p>
        <p className="text-center text-xl font-bold my-8">{question.label}</p>
        <MinimalSkillsForm question={question} isRight={isRight} />
        {isRight !== null && !!question.explanations && (
          <div className="mt-8">
            <h3>{t('minimal_skills.explanations')}</h3>
            <p>{question.explanations}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function action(args: ActionFunctionArgs) {
  const session = await getMinimalSkillsSession(
    args.request.headers.get('Cookie')
  );
  const formData = await args.request.formData();
  const action = formData.get('_action');
  //
  switch (action) {
    case 'answer':
      await userIsAnswering(formData, session);
      break;
    case 'next':
      nextQuestion(session);
      break;
    case 'restart':
      return new Response(null, {
        headers: { 'Set-Cookie': await destroyMinimalSkillsSession(session) },
      });
  }
  //
  return new Response(null, {
    headers: { 'Set-Cookie': await commitMinimalSkillsSession(session) },
  });
}

async function userIsAnswering(
  formData: FormData,
  session: MinimalSkillsSession
) {
  const { data, error } = await minimalSkillsFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  const selected = data.selected.map(Number);
  const { answers } = session.data.question!;
  const rightAnswersIndexes = answers.reduce<number[]>((acc, answer, index) => {
    if (answer.isRight) {
      acc.push(index);
    }
    return acc;
  }, []);
  const isRight = _.isEqual(selected, rightAnswersIndexes);
  session.set('isRight', isRight);
  session.set('score', session.data.score! + (isRight ? 1 : 0));
}

function nextQuestion(session: MinimalSkillsSession) {
  session.unset('question');
  session.set('isRight', null);
  session.set('count', session.data.count! + 1);
}
