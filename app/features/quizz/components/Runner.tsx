import { SelectQuestion } from '~/db/schemas';
import { useRunner } from '../hooks/useRunner';
import { End } from './End';
import { MainForm } from './MainForm';

export function Runner({ questions }: { questions: SelectQuestion[] }) {
  const runner = useRunner(questions);
  return !runner.question ? (
    <End {...runner} total={questions.length} />
  ) : (
    <MainForm {...runner} />
  );
}
