import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PenIcon, TrashIcon } from 'lucide-react';
import { SelectQuestionTag } from '~/db/schemas';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Button } from '~/features/ui/components/Button';
import { TagForm } from './TagForm';

export function TagList({ tags }: { tags: SelectQuestionTag[] }) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const [editing, setEditing] = useState(-1);

  if (tags.length === 0) {
    return <p>{t('nothing')}</p>;
  }
  //
  return tags.map((tag, index) =>
    editing === index ? (
      <TagForm key={tag.id} tag={tag} toggleEditing={() => setEditing(-1)} />
    ) : (
      <div
        key={tag.id}
        className="flex border-b items-center justify-between py-1"
      >
        <p>{tag.label}</p>
        <div className="flex">
          <Button Icon={PenIcon} onClick={() => setEditing(index)} ghost />
          <fetcher.Form method="POST">
            <input name="id" defaultValue={tag.id} hidden />
            <FetcherSubmitButton
              actionName="delete"
              Icon={TrashIcon}
              fetcher={fetcher}
              ghost
            />
          </fetcher.Form>
        </div>
      </div>
    )
  );
}
