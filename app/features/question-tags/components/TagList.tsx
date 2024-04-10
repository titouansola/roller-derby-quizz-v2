import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectQuestionTag } from '~/db/schemas';
import { TagForm } from './TagForm';
import { useFetcher } from '@remix-run/react';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';

export function TagList({ tags }: { tags: SelectQuestionTag[] }) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(-1);
  const fetcher = useFetcher();
  //
  return (
    <div>
      {tags.map((tag, index) =>
        editing === index ? (
          <TagForm
            key={tag.id}
            tag={tag}
            toggleEditing={() => setEditing(-1)}
          />
        ) : (
          <div key={tag.id}>
            {tag.label}
            <button onClick={() => setEditing(index)}>{t('edit')}</button>
            <fetcher.Form method="POST">
              <input name="id" defaultValue={tag.id} hidden />
              <FetcherSubmitButton actionName="delete" label="delete" />
            </fetcher.Form>
          </div>
        )
      )}
    </div>
  );
}
