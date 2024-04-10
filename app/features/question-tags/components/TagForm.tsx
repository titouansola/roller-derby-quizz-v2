import { ValidatedForm } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import { SelectQuestionTag } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { questionTagValidator } from '../form/question-tag-form';
import { useEffect } from 'react';

export function TagForm({
  tag,
  toggleEditing,
}: {
  tag?: SelectQuestionTag;
  toggleEditing?: () => void;
}) {
  const { t } = useTranslation();
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
      <Input name="id" hidden />
      <Input name="label" label="question_tag.label" />
      <FetcherSubmitButton actionName={!!tag ? 'update' : 'create'} />
      {!!toggleEditing && (
        <button type="button" onClick={toggleEditing}>
          {t('cancel')}
        </button>
      )}
    </ValidatedForm>
  );
}
