import { Form } from '@remix-run/react';
import { ValidatedForm, useFormContext } from 'remix-validated-form';
import { CheckIcon } from 'lucide-react';
import { SelectQuestion } from '~/db/schemas';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { minimalSkillsFormValidator } from '../form/minimal-skills-form';

export function MinimalSkillsForm({
  question,
  isRight,
}: {
  question: SelectQuestion;
  isRight: boolean | null;
}) {
  const { reset } = useFormContext('minimalSkillsForm');
  return (
    <>
      <ValidatedForm
        id="minimalSkillsForm"
        method="POST"
        validator={minimalSkillsFormValidator}
      >
        <div className="flex flex-col gap-4 mb-8">
          {question.answers.map((answer, index) => (
            <div key={index} className="flex gap-2">
              <Checkbox
                label={answer.label}
                name="selected"
                value={index.toString()}
              />
              {isRight !== null && answer.isRight && <CheckIcon />}
            </div>
          ))}
        </div>

        {isRight === null && (
          <FetcherSubmitButton actionName="answer" label="confirm" full />
        )}
      </ValidatedForm>
      {isRight !== null && (
        <Form method="POST">
          <FetcherSubmitButton
            actionName="next"
            label="minimal_skills.next_question"
            onClick={reset}
            full
          />
        </Form>
      )}
    </>
  );
}
