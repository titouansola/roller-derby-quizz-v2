import { Link } from '@remix-run/react';
import { useFieldArray, ValidatedForm } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { XIcon } from 'lucide-react';
import { Answer, SelectQuestion } from '~/db/schemas';
import { questionValidator } from '~/features/questions/form/question-form';
import { Input } from '~/features/ui/form/Input';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { Button } from '~/features/ui/components/Button';

const FORM_ID = 'question-form';

export function QuestionForm({ question }: { question?: SelectQuestion }) {
  const { t } = useTranslation();
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
      <fieldset>
        <Input name="id" hidden />
        <Input name="label" label="label" required />
        <div>
          <h3>{t('answers')}</h3>
          {answers.map(({ key }, index) => (
            <div
              key={key}
              style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}
            >
              <Input name={`answers[${index}].label`} label="label" required />
              <Checkbox name={`answers[${index}].isRight`} label="is_right" />
              <Button
                Icon={XIcon}
                type="button"
                onClick={() => onRemoveAnswer(index)}
                aria-label={t('delete')}
                ghost
              />
            </div>
          ))}
        </div>
        <Button label="add_answer" type="button" onClick={onAddAnswer} />

        <Input name="explanations" label="explanations" />

        <div className="flex flex-col gap-2 justify-stretch">
          <Button label="confirm" />
          <Link to=".." relative="path">
            <Button label="cancel" type="button" full />
          </Link>
        </div>
      </fieldset>
    </ValidatedForm>
  );
}
