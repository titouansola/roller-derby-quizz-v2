import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import { SelectQuestionTag } from '~/db/schemas';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Button } from '~/features/ui/components/Button';
import { TagForm } from './TagForm';

export function TagList({ tags }: { tags: SelectQuestionTag[] }) {
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
            <Button label="edit" onClick={() => setEditing(index)} />
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
