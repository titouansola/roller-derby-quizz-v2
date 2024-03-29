import {
  useFieldArray,
  useFormContext,
  ValidatedForm,
} from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { questionValidator } from '~/features/questions/question.form';
import {
  Answer,
  SelectQuestion,
} from '~/features/questions/question-entity.schema';
import { Input } from '~/features/ui/form/Input';
import { Checkbox } from '~/features/ui/form/Checkbox';

const FORM_ID = 'question-form';

export function QuestionForm({ question }: { question?: SelectQuestion }) {
  const { t } = useTranslation();
  const { reset } = useFormContext(FORM_ID);
  const [answers, { push, remove }] = useFieldArray<Answer>('answers', {
    formId: FORM_ID,
  });
  const onAddAnswer = () => push({ label: '', isRight: false } as Answer);
  const onRemoveAnswer = (index: number) => remove(index);
  //
  return (
    <ValidatedForm
      method="POST"
      id={FORM_ID}
      defaultValues={question}
      validator={questionValidator}
      resetAfterSubmit={!question}
    >
      <Input name="id" hidden />
      <Input name="label" label="label" />
      <p>{t('answers')}</p>
      {answers.map(({ key }, index) => (
        <div
          key={key}
          style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}
        >
          <Input name={`answers[${index}].label`} label="label" />
          <Checkbox name={`answers[${index}].isRight`} label="is_right" />
          <button
            type="button"
            onClick={() => onRemoveAnswer(index)}
            aria-label={t('delete')}
          >
            x
          </button>
        </div>
      ))}
      <button type="button" onClick={onAddAnswer}>
        {t('add_answer')}
      </button>
      <Input name="explanations" label="explanations" />
      <button type="button" onClick={reset}>
        {t('cancel')}
      </button>
      <button type="submit">{t('confirm')}</button>
    </ValidatedForm>
  );
}
