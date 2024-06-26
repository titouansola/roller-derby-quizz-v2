import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import { SelectQuestionTag } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Button } from '~/features/ui/components/Button';
import { questionTagValidator } from '../form/question-tag-form';

export function TagForm({
  tag,
  toggleEditing,
}: {
  tag?: SelectQuestionTag;
  toggleEditing?: () => void;
}) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (!!toggleEditing && fetcher.state === 'loading') {
      toggleEditing();
    }
  }, [fetcher.state, toggleEditing]);

  return (
    <ValidatedForm
      method="POST"
      validator={questionTagValidator}
      fetcher={fetcher}
      defaultValues={tag}
      resetAfterSubmit
    >
      <fieldset>
        <Input name="id" hidden />
        <Input name="label" label="question_tag.label" required />
        {!!toggleEditing && (
          <Button label="cancel" type="button" onClick={toggleEditing} />
        )}
        <FetcherSubmitButton
          actionName={!!tag ? 'update' : 'create'}
          fetcher={fetcher}
        />
      </fieldset>
    </ValidatedForm>
  );
}
