import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  commitMinimalSkillsSession,
  destroyMinimalSkillsSession,
  getMinimalSkillsSession,
} from '~/features/minimal-skills/session/minimal-skills-session';
import { Button } from '~/features/ui/components/Button';
import { Layout } from '~/features/ui/layout/Layout';
import { userHistoryService } from '~/features/user-history/services/user-history-service.server';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  const session = await getMinimalSkillsSession(
    args.request.headers.get('Cookie')
  );
  const score = session.data.score;

  if (_.isUndefined(score)) {
    return redirect('/minimal-skills');
  }

  const user = await userService.getIfConnected(args);

  if (!!user) {
    await userHistoryService.addUserHistory({
      userId: user.id,
      date: new Date().toDateString(),
      score,
    });
  }

  return json(
    { score },
    { headers: { 'Set-Cookie': await destroyMinimalSkillsSession(session) } }
  );
}

export default function Component() {
  const { t } = useTranslation();
  const { score } = useLoaderData<typeof loader>();
  //
  return (
    <Layout>
      <div className="py-4 text-center">
        <h2>{t('minimal_skills.end')}</h2>
        <div className="py-8">
          <p>{t('minimal_skills.you_obtained')}</p>
          <p className="font-black text-5xl">{score} / 50</p>
        </div>
        <Link to=".." relative="path" className="w-full">
          <Button label="minimal_skills.restart" full />
        </Link>
      </div>
    </Layout>
  );
}
