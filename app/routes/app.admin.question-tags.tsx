import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { userService } from '~/features/users/services/user.service.server';
import { questionTagsService } from '~/features/question-tags/services/question-tags-service.server';
import { TagList } from '~/features/question-tags/components/TagList';
import { TagForm } from '~/features/question-tags/components/TagForm';
import { questionTagValidator } from '~/features/question-tags/form/question-tag-form';
import { HasRole } from '~/features/users/components/HasRole';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { validationError } from 'remix-validated-form';
import { BadRequestResponse } from '~/features/common/types/bad-request-response';
import { toastService } from '~/features/toasts/services/toast.service.server';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  const tags = await questionTagsService.getAll();
  return json(tags);
}

export default function Component() {
  const { t } = useTranslation();
  const tags = useLoaderData<typeof loader>();
  return (
    <HasRole userRole={'ADMIN'}>
      <section>
        <h2>{t('question_tags')}</h2>
        <TagList tags={tags} />
      </section>
      <section>
        <h2>{t('question_tag.add')}</h2>
        <TagForm />
      </section>
    </HasRole>
  );
}

export const action = handleErrors(async (args) => {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  const action = formData.get('_action');
  switch (action) {
    case 'create':
      return createTag(formData);
    case 'update':
      return updateTag(formData);
    case 'delete':
      return deleteTag(formData);
  }
  return null;
});

async function createTag(formData: FormData) {
  const { error, data } = await questionTagValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await questionTagsService.create(data);
  return toastService.createResponseCreatedToast();
}

async function updateTag(formData: FormData) {
  const { error, data } = await questionTagValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await questionTagsService.update(data);
  return toastService.createResponseUpdatedToast();
}

async function deleteTag(formData: FormData) {
  const id = parseInt((formData.get('id') as string) ?? '0');
  if (!(id > 0)) {
    return new BadRequestResponse();
  }
  await questionTagsService.delete(id);
  return toastService.createResponseDeletedToast();
}
