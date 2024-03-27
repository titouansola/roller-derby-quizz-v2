import {
  useFieldArray,
  useFormContext,
  ValidatedForm,
} from 'remix-validated-form';
import { questionValidator } from '~/features/questions/question.form';
import { Checkbox } from '../../ui/form/Checkbox';
import { Input } from '../../ui/form/Input';
import {
  Answer,
  SelectQuestion,
} from '~/features/questions/question-entity.schema';

const FORM_ID = 'question-form';

export function QuestionForm({ question }: { question?: SelectQuestion }) {
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
      <Input name="label" label="Label" />
      <p>Answers</p>
      {answers.map(({ key }, index) => (
        <div
          key={key}
          style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}
        >
          <Input name={`answers[${index}].label`} label="Label" />
          <Checkbox name={`answers[${index}].isRight`} label="Is right" />
          <button type="button" onClick={() => onRemoveAnswer(index)}>
            delete
          </button>
        </div>
      ))}
      <button type="button" onClick={onAddAnswer}>
        Add Answer
      </button>
      <Input name="explanations" label="Explanations" />
      <button type="button" onClick={reset}>
        Reset
      </button>
      <button type="submit">Submit</button>
    </ValidatedForm>
  );
}
