import { FormEventHandler } from 'react';
import { SelectQuestion } from '~/features/questions/question-entity.schema';
import { useTranslation } from 'react-i18next';

export function MainForm({
  question,
  checked,
  result,
  onToggle,
  onConfirm,
}: {
  question: SelectQuestion;
  checked: number[];
  result: boolean | null;
  onConfirm: FormEventHandler;
  onToggle: (index: number) => void;
}) {
  const { t } = useTranslation();
  //
  return (
    <form onSubmit={onConfirm}>
      <h3>{question.label}</h3>
      {question.answers.map((answer, index) => (
        <div key={index}>
          <input
            id={answer.label}
            type="checkbox"
            checked={checked.includes(index)}
            onChange={() => onToggle(index)}
          />
          <label htmlFor={answer.label}>{answer.label}</label>
          {result !== null && (
            <span>(debug) {answer.isRight ? 'true' : 'false'}</span>
          )}
        </div>
      ))}
      {result !== null && t(result ? 'quizz.success' : 'quizz.error')}
      {result !== null && !!question.explanations && (
        <div>
          <p>{t('explanations')}</p>
          <p>{question.explanations}</p>
        </div>
      )}
      <button type="submit" disabled={checked.length === 0}>
        {t('confirm')}
      </button>
    </form>
  );
}
