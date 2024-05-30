import { createCookieSessionStorage, Session } from '@remix-run/node';
import { SelectQuestion } from '~/db/schemas';

type MinimalSkillsSessionData = {
  count: number;
  previousQuestionIds: number[];
  question: SelectQuestion;
  score: number;
  isRight: boolean | null;
};

type MinimalSkillsSessionFlashData = {
  error: string;
};

export type MinimalSkillsSession = Session<
  MinimalSkillsSessionData,
  MinimalSkillsSessionFlashData
>;

export const {
  getSession: getMinimalSkillsSession,
  commitSession: commitMinimalSkillsSession,
  destroySession: destroyMinimalSkillsSession,
} = createCookieSessionStorage<
  MinimalSkillsSessionData,
  MinimalSkillsSessionFlashData
>({
  cookie: {
    name: 'minimal-skills-session',
    secrets: ['hlkjyu57FJYH64doèi§jyh4YER'],
  },
});
